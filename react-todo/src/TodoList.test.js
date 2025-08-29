import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Component', () => {

  // Test 1: Initial Render
  test('renders the initial list of todos', () => {
    render(<TodoList />);
    expect(screen.getByText(/Learn React Testing Library/i)).toBeInTheDocument();
    expect(screen.getByText(/Build a Todo List component/i)).toBeInTheDocument();
    expect(screen.getByText(/Write tests for the component/i)).toBeInTheDocument();
  });

  // Test 2: Adding Todos
  test('allows users to add a new todo', () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/Add new todo/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(inputElement, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/New Test Todo/i)).toBeInTheDocument();
  });

  // Test 3: Toggling Todos
  test('toggles the completion status of a todo', () => {
    render(<TodoList />);
    const todoItem = screen.getByText(/Learn React Testing Library/i);

    // Initial state check
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');

    fireEvent.click(todoItem);

    // After click, state should be toggled
    expect(todoItem).toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting Todos
  test('deletes a todo item', () => {
    render(<TodoList />);
    const todoItem = screen.getByText(/Build a Todo List component/i);
    
    // Find the delete button associated with the todo item
    const deleteButton = screen.getAllByRole('button', { name: /Delete/i })[1];
    
    fireEvent.click(deleteButton);
    
    // The item should no longer be in the document
    expect(todoItem).not.toBeInTheDocument();
  });
});