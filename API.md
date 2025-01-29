# Coordinador

## /transaction

- Post

  - Request:

  ```
    {
    user_from,
    user_to,
    mount
    }
  ```

  - Response

  ```
  {
  status
  }
  ```

# Pool Manager

## /keepAlive

- Post

  - Request:

    ```
    {
    worker_id
    }
    ```

    - Response:

    ```
    {
    Status
    }
    ```

## /worker/add

- Post

  - Request

    ```
    {
    user_id
    }
    ```

    - Response:

    ```
    {
    worker_id
    }
    ```

/status
Get
…

## RabbitMQ

**Transactions queue**: El coordinador publica allí las transacciones que recibe en el endpoint /transactions, y son consumidas por un proceso que se ejecuta cada 60 segundos.

**Blocks topic**: El coordinador cada 60 segundos genera un bloque para minar con las transacciones ocurridas en ese período, y lo publica en este tópico que es consumido por
los pool manager.

**Workers topic**: Los pool manager publicarán aquí N subtareas que resultan de partir aquellas leídas del block topic. N son los workers activos, y estos consumen de este tópico para trabajar.
