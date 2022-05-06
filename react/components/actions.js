
export const sendData = async (data, dataImages) => {
  var url = '/_v/sendData';
var obj = {
  data,
  dataImages
};

fetch(url, {
  method: 'POST',
  body: JSON.stringify(obj),
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

}


