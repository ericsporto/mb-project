const handleRegister = async (data) => {
    const url = 'http://localhost:3000/registration'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Error trying to send data to server');
      }

      return await response.json();
    } catch (erro) {
      throw new Error('Error to send data:' + erro.message);
    }
  }

  export default handleRegister;