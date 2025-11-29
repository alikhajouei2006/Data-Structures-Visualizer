# Data Structures Visualizer

**Data Structures Visualizer** is an interactive web-based tool designed to help learners understand core data structures such as **Stack**, **Queue**, and **Linked List** visually.  
The project aims to make abstract concepts tangible by showing dynamic, real-time updates as data is added, removed, or modified.

## Features

- Interactive visualization of Stack, Queue, and Linked List
- Push, Pop, Enqueue, Dequeue, and Insert/Remove operations supported
- Smooth visual effects for added and removed nodes
- Fully **RTL-ready** for Persian or other right-to-left languages
- Modern, responsive design with customizable fonts
- Educational focus: helps learners grasp algorithmic thinking through visual feedback

## Why Visualization Matters

Understanding data structures can be abstract and difficult when relying solely on code. This tool bridges that gap by:

- Showing the **real-time state** of data structures after each operation
- Helping learners **predict the behavior** of operations visually
- Improving **algorithmic thinking** by connecting theoretical concepts to interactive elements

## Project Structure

main/
index.html # Main homepage
style.css # Global styles
LinkedList/
link.html # Linked List visualization
Queue&Stack/
stack.html # Stack & Queue visualization
fonts/
Peyda.ttf # Custom font file


## Getting Started

1. Clone or download the repository.
2. Open `main/index.html` in your preferred web browser.
3. Click on the links to access the **Linked List** or **Stack & Queue** panels.

## Usage

- Use input fields to add values to the data structures.
- Observe animations showing **push/pop** (Stack), **enqueue/dequeue** (Queue), and **insert/remove** (Linked List).
- The tool automatically highlights newly added nodes to make learning interactive.

## Development

- To add a new data structure, create a separate HTML file, link the CSS and JS, and add a navigation link on the homepage.
- All styles are defined in `style.css`, and JS files control interaction logic.
- The project is modular, so new visualizations can be added without affecting existing panels.

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
