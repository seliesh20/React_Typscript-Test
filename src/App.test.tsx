import React from 'react';
import { fireEvent, render, screen, within} from '@testing-library/react';
import App from './App';

test('Home Page', async () => {
  render(<App />)
  const linkElement = screen.getByRole('button', {
    name: /Load Posts/i
  });  
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement)

  const posts = await screen.getAllByRole('listitem')
  expect(posts[0]).toBeInTheDocument() 

  const editLink = within(posts[0]).getByRole('editlink')
  fireEvent.click(editLink)  

  const editPageFormTitle = await screen.getByText('Title')
  expect(editPageFormTitle).toBeInTheDocument() 

})


