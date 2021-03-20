function generateCupcakeHTML(cupcake){
    return `<div data-cupcake-id=${cupcake.id}>
        <li> ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button class="cupcake-delete btn btn-danger btn-small">X</button>
        </li>
        <div>
            <img class="cupcake-img" src="${cupcake.image}" 
            alt="${cupcake.flavor} cupcake image">
        </div>
    </div>`
}

async function startCupcakePage() {
    const response = await axios.get(`/api/cupcakes`);
  
    for (let cupcakeData of response.data.cupcakes) {
      let newCupcake = generateCupcakeHTML(cupcakeData);
      $("#cupcake-list").append(newCupcake);
    }
  }

$("#cupcake-form").on("submit", async function (evt) {
    evt.preventDefault();
  
    let flavor = $("#flavor").val();
    let rating = $("#rating").val();
    let size = $("#size").val();
    let image = $("#image").val();
  
    const newCupcakeResponse = await axios.post(`/api/cupcakes`, {
      flavor,
      rating,
      size,
      image
    });
  
    let newCupcake = generateCupcakeHTML(newCupcakeResponse.data.cupcake);
    $("#cupcake-list").append(newCupcake);
    $("#cupcake-form").trigger("reset"); 
  });

$(".cupcake-delete").on('click', function(evt){
    evt.preventDefault();

    console.log('hihihih')
})


$(document).ready(startCupcakePage());