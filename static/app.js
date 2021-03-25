function generateCupcakeHTML(cupcake){
    return `<div>
        <li> ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button data-cupcake-id=${cupcake.id}
            class="cupcake-delete btn btn-danger btn-sm">
            X</button>
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

$("#cupcake-list").on('click', ".cupcake-delete", async function(evt){
    evt.preventDefault();
    cupcakeId = $(this).data('cupcake-id')
    await axios.delete(`/api/cupcakes/${cupcakeId}`)
    $(this).parent().parent().remove()
}) 

$(document).ready(startCupcakePage());