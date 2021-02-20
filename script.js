var cart = {
    hPdt : null,
    hItems : null,
    items : {},
  

    save : function () {
      localStorage.setItem("cart", JSON.stringify(cart.items));
    },
  

    load : function () {
      cart.items = localStorage.getItem("cart");
      if (cart.items == null) { cart.items = {}; }
      else { cart.items = JSON.parse(cart.items); }
    },
  

    nuke : function () {
      if (confirm("Empty cart?")) {
        cart.items = {};
        localStorage.removeItem("cart");
        cart.list();
      }
    },
  

    init : function () {
     
      cart.hPdt = document.getElementById("cart-products");
      cart.hItems = document.getElementById("cart-items");
  
     
      cart.hPdt.innerHTML = "";
      let p, item, part;
      for (let id in products) {
        // wrapper
        p = products[id];
        item = document.createElement("div");
        item.className = "p-item";
        cart.hPdt.appendChild(item);
  
        // imagen
        part = document.createElement("img");
        part.src = "/images/" +p.img;
        part.className = "p-img";
        item.appendChild(part);
  
        // nombre producto
        part = document.createElement("div");
        part.innerHTML = p.nombre;
        part.className = "p-name";
        item.appendChild(part);
  
        // descripcion producto
        part = document.createElement("div");
        part.innerHTML = p.desc;
        part.className = "p-desc";
        item.appendChild(part);
  
        // precio producto
        part = document.createElement("div");
        part.innerHTML = "S/ " + p.precio;
        part.className = "p-price";
        item.appendChild(part);
  
        // compra
        part = document.createElement("input");
        part.type = "button";
        part.value = "Añadir al carrito";
        part.className = "cart p-add";
        part.onclick = cart.add;
        part.dataset.id = id;
        item.appendChild(part);
      }
  
      cart.load();
  
      cart.list();
    },
  
    list : function () {
    
      cart.hItems.innerHTML = "";
      let item, part, pdt;
      let empty = true;
      for (let key in cart.items) {
        if(cart.items.hasOwnProperty(key)) { empty = false; break; }
      }
  
      if (empty) {
        item = document.createElement("div");
        item.innerHTML = "el carrito esta vacio, realize una compra 😭😭";
        cart.hItems.appendChild(item);
      }
  
      else {
        let p, total = 0, subtotal = 0;
        for (let id in cart.items) {
          // item
          p = products[id];
          item = document.createElement("div");
          item.className = "c-item";
          cart.hItems.appendChild(item);
  
          // imagen
          part = document.createElement("img");
          part.src = "/images/" +p.img;
          part.className = "p-img-check";
          item.appendChild(part);

          // nombre
          part = document.createElement("div");
          part.innerHTML = p.nombre;
          part.className = "c-name";
          item.appendChild(part);


          // precio producto
        part = document.createElement("div");
        part.innerHTML = "S/ " + p.precio;
        part.className = "p-price-check";
        item.appendChild(part);
          
  
          // limpiar
          part = document.createElement("input");
          part.type = "button";
          part.value = "x";
          part.dataset.id = id;
          part.className = "c-del cart";
          part.addEventListener("click", cart.remove);
          item.appendChild(part);

        
  
          // cantidad
          
          part = document.createElement("input");          
          part.type = "number";          
          part.value = cart.items[id];
          part.dataset.id = id;
          part.className = "c-qty";
          part.addEventListener("change", cart.change);
          item.appendChild(part);

  
          // subtotal
          subtotal = cart.items[id] * p.precio;
          total += subtotal;
        }
  
        //boton delete
        item = document.createElement("input");
        item.type = "button";
        item.value = "No comprar nada 🙄";
        item.addEventListener("click", cart.nuke);
        item.className = "c-empty cart";
        cart.hItems.appendChild(item);
  
        //boton checkout
        item = document.createElement("input");
        item.type = "button";
        item.value = "Checkout - " + "S/ " + total;
        item.addEventListener("click", cart.checkout);
        item.className = "c-checkout cart";
        cart.hItems.appendChild(item);
      }
    },
  
    add : function () {
      if (cart.items[this.dataset.id] == undefined) {
        cart.items[this.dataset.id] = 1;
      } else {
        cart.items[this.dataset.id]++;
      }
      cart.save();
      cart.list();
    },
  
    change : function () {
      if (this.value == 0) {
        delete cart.items[this.dataset.id];
      } else {
        cart.items[this.dataset.id] = this.value;
      }
      cart.save();
      cart.list();
    },
    
    // remover item
    remove : function () {
      delete cart.items[this.dataset.id];
      cart.save();
      cart.list();
    },
    
    // checkout
    checkout : function () {
    
      alert("Se realizo la compra. ahora se lo entregamos en dron 😏 ");
  
    }
  };
  window.addEventListener("DOMContentLoaded", cart.init);