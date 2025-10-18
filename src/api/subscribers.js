const subscribe = async (subscriber) => {
  await fetch('/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscriber),
  });
}

export default subscribe;