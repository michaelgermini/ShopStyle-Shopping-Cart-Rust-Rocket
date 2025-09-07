use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::io::{BufRead, BufReader, Read, Write};
use std::net::TcpListener;
use std::sync::{Arc, Mutex};

#[derive(Serialize, Deserialize, Clone)]
struct Product {
    name: String,
    price: f64,
    quantity: u32,
}

#[derive(Serialize, Deserialize, Clone)]
struct CartItem {
    product: Product,
    total_price: f64,
}

type Cart = Arc<Mutex<HashMap<String, Product>>>;

fn serve_static_file(path: &str) -> Option<String> {
    // Si c'est la racine, servir index.html
    let actual_path = if path == "/" {
        "static/index.html".to_string()
    } else {
        format!("static{}", path)
    };

    // Déterminer le type MIME basé sur l'extension
    let content_type = if actual_path.ends_with(".html") {
        "text/html"
    } else if actual_path.ends_with(".css") {
        "text/css"
    } else if actual_path.ends_with(".js") {
        "application/javascript"
    } else if actual_path.ends_with(".json") {
        "application/json"
    } else {
        "text/plain"
    };

    match fs::read_to_string(&actual_path) {
        Ok(content) => Some(format!(
            "HTTP/1.1 200 OK\r\nContent-Length: {}\r\nContent-Type: {}\r\n\r\n{}",
            content.len(),
            content_type,
            content
        )),
        Err(_) => None,
    }
}

fn handle_request(request: &str, cart: &Cart) -> String {
    let lines: Vec<&str> = request.lines().collect();
    if lines.is_empty() {
        return create_response(400, "Bad Request");
    }

    let first_line = lines[0];
    let parts: Vec<&str> = first_line.split_whitespace().collect();
    if parts.len() < 2 {
        return create_response(400, "Bad Request");
    }

    let method = parts[0];
    let path = parts[1];

    println!("📨 Requête: {} {}", method, path);

    // Traiter d'abord les fichiers statiques
    if method == "GET" {
        if let Some(response) = serve_static_file(path) {
            return response;
        }
    }

    match (method, path) {
        ("GET", "/api") => create_response(200, "Bienvenue sur l'API du Shopping Cart !\n\nEndpoints disponibles:\n- POST /cart/add\n- DELETE /cart/remove/<name>\n- GET /cart\n- GET /cart/total"),

        ("GET", "/cart") => {
            let cart = cart.lock().unwrap();
            let items: Vec<CartItem> = cart
                .values()
                .map(|product| CartItem {
                    product: product.clone(),
                    total_price: product.price * product.quantity as f64,
                })
                .collect();

            match serde_json::to_string(&items) {
                Ok(json) => create_json_response(200, &json),
                Err(_) => create_response(500, "Internal Server Error"),
            }
        }

        ("GET", "/cart/total") => {
            let cart = cart.lock().unwrap();
            let total: f64 = cart
                .values()
                .map(|product| product.price * product.quantity as f64)
                .sum();

            create_response(200, &format!("Total du panier: {:.2}€", total))
        }

        ("POST", "/cart/add") => {
            // Pour simplifier, on simule l'ajout d'un produit
            let mut cart = cart.lock().unwrap();
            let product = Product {
                name: format!("Produit {}", cart.len() + 1),
                price: 19.99,
                quantity: 1,
            };

            let total_price = product.price * product.quantity as f64;
            cart.insert(product.name.clone(), product);

            create_response(200, &format!("Produit ajouté au panier. Prix total: {:.2}", total_price))
        }

        ("DELETE", path) if path.starts_with("/cart/remove/") => {
            let name = &path[13..]; // Enlever "/cart/remove/"
            let mut cart = cart.lock().unwrap();

            match cart.remove(name) {
                Some(_) => create_response(200, &format!("Produit '{}' supprimé du panier", name)),
                None => create_response(404, &format!("Produit '{}' non trouvé dans le panier", name)),
            }
        }

        _ => create_response(404, "Not Found"),
    }
}

fn create_response(status_code: u16, body: &str) -> String {
    format!(
        "HTTP/1.1 {} {}\r\nContent-Length: {}\r\nContent-Type: text/plain\r\n\r\n{}",
        status_code,
        match status_code {
            200 => "OK",
            400 => "Bad Request",
            404 => "Not Found",
            500 => "Internal Server Error",
            _ => "Unknown",
        },
        body.len(),
        body
    )
}

fn create_json_response(status_code: u16, json: &str) -> String {
    format!(
        "HTTP/1.1 {} {}\r\nContent-Length: {}\r\nContent-Type: application/json\r\n\r\n{}",
        status_code,
        match status_code {
            200 => "OK",
            400 => "Bad Request",
            404 => "Not Found",
            500 => "Internal Server Error",
            _ => "Unknown",
        },
        json.len(),
        json
    )
}

fn main() -> std::io::Result<()> {
    // Changer le répertoire de travail vers le répertoire du projet
    let exe_path = std::env::current_exe()?;
    let project_dir = exe_path.parent().unwrap().parent().unwrap().parent().unwrap();
    std::env::set_current_dir(project_dir)?;

    let cart: Cart = Arc::new(Mutex::new(HashMap::new()));
    let listener = TcpListener::bind("127.0.0.1:8000")?;

    println!("🚀 Web server started on http://127.0.0.1:8000");
    println!("📄 Open http://127.0.0.1:8000 in your browser");
    println!("🛒 ShopStyle e-commerce site ready!");
    println!("📋 API available at /api");

    println!("🔄 Server ready to accept connections...");
    println!("💡 Press Ctrl+C to stop the server");

    for stream in listener.incoming() {
        match stream {
            Ok(mut stream) => {
                let cart = Arc::clone(&cart);

                std::thread::spawn(move || {
                    // Use BufReader for more robust reading
                    let mut reader = BufReader::new(&mut stream);
                    let mut request_line = String::new();

                    match reader.read_line(&mut request_line) {
                        Ok(_) => {
                            // Lire les headers supplémentaires si nécessaire
                            let mut headers = Vec::new();
                            let mut line = String::new();

                            loop {
                                line.clear();
                                match reader.read_line(&mut line) {
                                    Ok(0) => break, // End of stream
                                    Ok(_) => {
                                        if line.trim().is_empty() {
                                            break; // End of headers
                                        }
                                        headers.push(line.clone());
                                    }
                                    Err(e) => {
                                        println!("❌ Error reading headers: {}", e);
                                        return;
                                    }
                                }
                            }

                            let response = handle_request(&request_line.trim(), &cart);

                            if let Err(e) = stream.write_all(response.as_bytes()) {
                                println!("❌ Error writing response: {}", e);
                            }
                            if let Err(e) = stream.flush() {
                                println!("❌ Error flushing stream: {}", e);
                            }
                        }
                        Err(e) => {
                            println!("❌ Error reading request line: {}", e);
                        }
                    }
                });
            }
            Err(e) => {
                println!("❌ Error accepting connection: {}", e);
                continue;
            }
        }
    }

    Ok(())
}
