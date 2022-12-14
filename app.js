const fetchCategories = async () => {
	const url = "https://openapi.programming-hero.com/api/news/categories";
	try {
		const response = await fetch(url);
		const categories = (await response.json()).data.news_category;
		return categories;
	} catch (err) {
		console.log(err);
	}
};

const loadingSpinner = (isLoaing) => {
	const loader = document.getElementById("loader");
	if (isLoaing) {
		loader.classList.remove("hidden");
	} else {
		loader.classList.add("hidden");
	}
};

const fetchNews = async (id, name) => {
	const news = document.getElementById("news");
	const totalItems = document.getElementById("total-items");
	loadingSpinner(true);
	news.innerHTML = "";
	totalItems.innerText = "";
	const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
	try {
		const response = await fetch(url);
		const data = (await response.json()).data;
		console.log(data);
		data.sort((a, b) => (a.total_view > b.total_view ? 1 : -1));
		let html = "";
		data.forEach((d) => {
			const { title, _id, author, total_view, image_url, details } = d;
			const { published_date, name, img } = author;
			console.log(typeof total_view);
			html += `
    <br/>
    <div class='flex md:flex-row sm:flex-col flex-col my-5 items-center'>
      <div class='md:w-2/5 sm:w-full'>
        <img src= ${image_url} class='w-full h-full'/>
      </div>
      <div class='md:w-3/5 sm:w-full ml-3'>
        <div>
          <h1 class='lg:text-3xl md:text-base sm:text-2xl text-base smy-2 text-blue-800'> ${title} </h1>
          <p class=' lg:text-xl md:text-sm sm:text-base text-'>${
						details
							? details.length > 250
								? `${details.substring(0, 250)} ....`
								: details
							: "Not Found"
					}</p>
        </div>
        <div class='mt-3 flex justify-between items-center'>
          <div class='flex items-center'>
            <div >
              <img src=${img} width='60px' height='60px' class='rounded-full' />
            </div>
            <div class='ml-3'>
              <h2 class='lg:text-2xl md:text-2xl sm:text-2xl text-base text-blue-800'>${
								name ? name : "Not Found"
							}</h2>
              <span>${published_date ? published_date : "Not Found"}</span>
            </div>
          </div>
          <div>
            <h3 class='text-blue-800'> <i class="fa-sharp fa-solid fa-eye"></i> ${
							total_view === null ? "0" : total_view
						}</h3>
          </div>
          <div class='text-2xl cursor-pointer text-blue-800' onclick='showModal("${_id}")' >
            <i class="fa-sharp fa-solid fa-right-long"></i>
          </div>
        </div>
      </div>
    </div>
    `;
		});
		loadingSpinner(false);
		totalItems.innerText = `${
			data.length > 0 ? data.length : "No"
		} items found for category ${name}`;
		news.innerHTML = html;
	} catch (error) {
		console.log(error);
	}
};

const displayCategories = async () => {
	try {
		const categories = await fetchCategories();
		const subNav = document.getElementById("sub-nav");
		let html = "";
		categories.forEach((category) => {
			const { category_name: name, category_id: id } = category;
			html += `
    <li class='mx-3 my-2 text-xl font-semibold hover:text-blue-800 active:text-blue-800'>
      <a href='#' onclick='fetchNews("${id}","${name}")' >${name}</a>
    </li>
    `;
		});
		subNav.innerHTML = html;
	} catch (error) {
		console.log(error);
	}
};

displayCategories();

fetchNews("08", "All News");

const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");
const showButton = document.getElementById("show-button");

const showModal = async (id) => {
	const modalBody = document.getElementById("modal-body");
	const url = `https://openapi.programming-hero.com/api/news/${id}`;

	try {
		const response = await fetch(url);
		const data = (await response.json()).data[0];
		console.log(data);

		const { author, image_url, details, title, total_view } = data;
		const { img, published_date, name } = author;
		const html = `
    <div>
      <div>
        <img src=${image_url} class='w-full'  /> 
      </div>
      <h1 class='lg:text-3xl md:texl-2xl sm:text-xl text-sm my-3'>${title}</h1>
      <div>
        ${details}
      </div>
      <div class='mt-4'>
        <div class='flex items-center'> 
          <div>
            <img src = ${img} width='50px' height='50px' class='rounded-full' />
          </div>
          <div class='ml-4'>
            <h2 class='text-blue-800 lg:text-xl md:text-xl sm:text-base text-sm' >${
							name ? name : "Not Found"
						}</h2>
            <h4>${published_date ? published_date : "Not Found"}</h4>
          </div>
          <div class='ml-10'>
            <h3 class='text-blue-800'> <i class="fa-sharp fa-solid fa-eye"></i> ${
							total_view === null ? "0" : total_view
						}</h3>
          </div>
        </div>
      </div>
    </div>
    
    `;
		console.log(modalBody);
		modalBody.innerHTML = html;
	} catch (error) {
		console.log(error);
	}

	overlay.classList.remove("hidden");
};

const close = () => {
	overlay.classList.add("hidden");
};

closeModal.addEventListener("click", close);
// overlay.addEventListener("click", () => {
// 	overlay.classList.add("hidden");
// });
