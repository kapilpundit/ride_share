import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginRegister from '../components/LoginRegister'; // Import your LoginRegister component
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a mock instance of axios
const mock = new MockAdapter(axios);

describe('LoginRegister', () => {
  beforeEach(() => {
    // Reset the mock before each test
    mock.reset();
  });

  test('renders login form with username and password fields', () => {
    render(<LoginRegister />);

    // Check that the login form elements are rendered
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

  });

  test('renders register form with username, email, and password fields when switching', () => {
    render(<LoginRegister />);

    // Click on the "Switch to Register" link
    fireEvent.click(screen.getByText(/switch to register/i));

    // Check that the register form elements are rendered
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

  });

  test('submits login form with valid data', async () => {
    mock.onPost('http://localhost:8000/api/login/').reply(200, {
      access: 'mockAccessToken',
    });

    render(<LoginRegister />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      // Check if the success message appears
      expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });
  });

  test('submits register form with valid data', async () => {
    mock.onPost('http://localhost:8000/api/register/').reply(200, {
      message: 'Registration successful',
    });

    // Switch to Register mode
    render(<LoginRegister />);
    fireEvent.click(screen.getByText(/switch to register/i));

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'newuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'newuser@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'newpassword123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      // Check if the success message appears
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
    });
  });

  test('shows error message for login failure', async () => {
    mock.onPost('http://localhost:8000/api/login/').reply(400, {
      error: 'Invalid credentials',
    });

    render(<LoginRegister />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      // Check if the error message appears
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  test('shows error message for registration failure', async () => {
    mock.onPost('http://localhost:8000/api/register/').reply(400, {
      error: 'Email already taken',
    });

    render(<LoginRegister />);

    // Switch to Register mode
    fireEvent.click(screen.getByText(/switch to register/i));

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'existinguser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'existinguser@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      // Check if the error message appears
      expect(screen.getByText(/email already taken/i)).toBeInTheDocument();
    });
  });
});
