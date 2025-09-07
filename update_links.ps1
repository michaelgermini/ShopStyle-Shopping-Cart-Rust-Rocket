# Script PowerShell pour mettre à jour les liens dans tous les fichiers HTML

# Fonction pour mettre à jour les liens dans un fichier
function Update-LinksInFile {
    param([string]$filePath, [string]$relativePath)

    Write-Host "Mise à jour des liens dans $filePath"

    # Lire le contenu du fichier
    $content = Get-Content $filePath -Raw

    # Mettre à jour les liens vers les pages
    $content = $content -replace 'href="about\.html"', ('href="' + $relativePath + 'pages/about.html"')
    $content = $content -replace 'href="stores\.html"', ('href="' + $relativePath + 'pages/stores.html"')
    $content = $content -replace 'href="careers\.html"', ('href="' + $relativePath + 'pages/careers.html"')
    $content = $content -replace 'href="blog\.html"', ('href="' + $relativePath + 'pages/blog.html"')
    $content = $content -replace 'href="press\.html"', ('href="' + $relativePath + 'pages/press.html"')
    $content = $content -replace 'href="shipping\.html"', ('href="' + $relativePath + 'pages/shipping.html"')
    $content = $content -replace 'href="faq\.html"', ('href="' + $relativePath + 'pages/faq.html"')
    $content = $content -replace 'href="size-guide\.html"', ('href="' + $relativePath + 'pages/size-guide.html"')
    $content = $content -replace 'href="tracking\.html"', ('href="' + $relativePath + 'pages/tracking.html"')
    $content = $content -replace 'href="support\.html"', ('href="' + $relativePath + 'pages/support.html"')
    $content = $content -replace 'href="legal\.html"', ('href="' + $relativePath + 'pages/legal.html"')
    $content = $content -replace 'href="privacy\.html"', ('href="' + $relativePath + 'pages/privacy.html"')
    $content = $content -replace 'href="terms\.html"', ('href="' + $relativePath + 'pages/terms.html"')
    $content = $content -replace 'href="cookies\.html"', ('href="' + $relativePath + 'pages/cookies.html"')
    $content = $content -replace 'href="contact\.html"', ('href="' + $relativePath + 'pages/contact.html"')
    $content = $content -replace 'href="account\.html"', ('href="' + $relativePath + 'pages/account.html"')
    $content = $content -replace 'href="login\.html"', ('href="' + $relativePath + 'pages/login.html"')
    $content = $content -replace 'href="register\.html"', ('href="' + $relativePath + 'pages/register.html"')
    $content = $content -replace 'href="orders\.html"', ('href="' + $relativePath + 'pages/orders.html"')
    $content = $content -replace 'href="search\.html"', ('href="' + $relativePath + 'pages/search.html"')
    $content = $content -replace 'href="cart\.html"', ('href="' + $relativePath + 'pages/cart.html"')
    $content = $content -replace 'href="checkout\.html"', ('href="' + $relativePath + 'pages/checkout.html"')
    $content = $content -replace 'href="promotions\.html"', ('href="' + $relativePath + 'pages/promotions.html"')
    $content = $content -replace 'href="new-arrivals\.html"', ('href="' + $relativePath + 'pages/new-arrivals.html"')
    $content = $content -replace 'href="collections\.html"', ('href="' + $relativePath + 'pages/collections.html"')

    # Mettre à jour les liens vers les catégories
    $content = $content -replace 'href="category\.html"', ('href="' + $relativePath + 'categories/category.html"')

    # Mettre à jour les liens vers les produits
    $content = $content -replace 'href="product-', ('href="' + $relativePath + 'products/product-')

    # Écrire le contenu mis à jour dans le fichier
    $content | Set-Content $filePath -Encoding UTF8
}

# Mettre à jour les liens dans les fichiers du répertoire static
Write-Host "Mise à jour des liens dans les fichiers du répertoire static..."

# Fichiers dans static/ (index.html, product.html)
Update-LinksInFile "static\index.html" ""
Update-LinksInFile "static\product.html" ""

# Fichiers dans static/pages/
$pageFiles = Get-ChildItem "static\pages\*.html"
foreach ($file in $pageFiles) {
    Update-LinksInFile $file.FullName "../"
}

# Fichiers dans static/products/
$productFiles = Get-ChildItem "static\products\*.html"
foreach ($file in $productFiles) {
    Update-LinksInFile $file.FullName "../"
}

# Fichiers dans static/categories/
$categoryFiles = Get-ChildItem "static\categories\*.html"
foreach ($file in $categoryFiles) {
    Update-LinksInFile $file.FullName "../"
}

Write-Host "Mise à jour des liens terminée !"
