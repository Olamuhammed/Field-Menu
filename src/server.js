
export const getAllMeals = () => {
  return fetch('http://127.0.0.1:5984/meal/_all_docs?include_docs=true', {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((data) => data.rows)
}

export const submitMeal = (props) => {
  fetch('http://127.0.0.1:5984/meal/', {
    method: 'POST',
    body: JSON.stringify({
      'name': props.name,
      'breakfast': props.breakfast,
      'lunch': props.lunch,
      'bar': props.bar
    }),
    headers: { 'Content-Type': 'application/json',
      Accept: 'application/json'
    } })
    .then((res) => res.json)
}

export const deleteMeal = (props) => {
  console.log(props)
  fetch(`http://127.0.0.1:5984/meal/${props._id}\?rev\=${props._rev}`, {
    method: 'DELETE'
  })
    .then((res) => res.json)
}
