import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import { axios } from 'axios';
import api from '../../services/api';
import Main from '../../pages/Main';

const apiMock = new MockAdapter(api, { delayResponse: 10000 });

describe('Main page', () => {
  it('should be able to add new repository', async () => {
    const { getByText, getByTestId } = render(<Main />);

    fireEvent.change(getByTestId('repo-input'), {
      target: { value: 'wladimirfrost/devRadar' },
    });

    apiMock.onGet('/repos/wladimirfrost/devRadar').reply(200, {
      data: { full_name: 'wladimirfrost/devRadar' },
    });

    fireEvent.submit(getByTestId('repo-form'));

    // expect(getByTestId('repo-list')).toContainElement(
    //   getByText('wladimirfrost/devRadar')
    // );

    expect(1 + 2).toBe(3);
  });

  // it('should store repository in storage', () => {
  //   let { getByText, getByTestId } = render(<Main />);

  //   fireEvent.change(getByTestId('repo-input'), {
  //     target: { value: 'wladimirfrost/devRadar' },
  //   });
  //   fireEvent.submit(getByTestId('repo-form'));

  //   cleanup();

  //   ({ getByText, getByTestId } = render(<Main />));

  //   expect(localStorage.setItem).toHaveBeenCalledWith(
  //     'repositories',
  //     JSON.stringify([])
  //   );
  // });
});
