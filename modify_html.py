from bs4 import BeautifulSoup

file_path = '/Users/tosh/Documents/PlatformIO/Projects/Certus project/src/tables/maszyny4.html'

with open(file_path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'lxml')

# Find all <td> elements that are not in the <thead>
for td in soup.select('tbody td'):
    # Skip the first td in each row (the parameter name)
    if td.find_previous_sibling('th'):
        continue

    # Create the icon element
    icon_svg = soup.new_tag('img', src='path/to/your/icon.svg', alt='icon', width='24', height='24')
    
    # Create a div to wrap the existing content
    content_div = soup.new_tag('div', class_='parameter-content')
    
    # Move all children of the td into the new div
    for child in list(td.children):
        content_div.append(child)
        
    # Append the icon and the content div to the td
    td.append(icon_svg)
    td.append(content_div)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))

print(f"Modified {file_path} successfully.")