import { useQueryClient } from '@tanstack/react-query';
import { createClient } from 'graphql-ws';
import { useEffect } from 'react';
import { useGetCommentsQuery } from '../generated/graphql';

export const useFetchData = <TData, TVariables>(
  query: string,
): ((variables?: TVariables) => Promise<TData>) => {
  const url = 'https://squint-test.hasura.app/v1/graphql';
  return async (variables?: TVariables) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || 'Error..';
      throw new Error(message);
    }

    return json.data;
  };
};

export const wsClient = createClient({
  url: 'wss://squint-test.hasura.app/v1/graphql',
});

export const useSubscription = ({
  operation,
  onMessage,
  onError,
  onComplete,
}) => {
  useEffect(() => {
    const subscription = wsClient.subscribe(
      {
        query: operation,
      },
      {
        next: onMessage,
        error: onError,
        complete: onComplete,
      },
    );

    return subscription;
  }, []);
};

