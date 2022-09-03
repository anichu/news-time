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
	const response = await fetch(url);
	const data = (await response.json()).data;
	let html = "";
	data.forEach((d) => {
		const { title, author, thumbnail_url, image_url, details } = d;
		html += `
    <br/>
    <div class='flex md:flex-row sm:flex-col flex-col my-5 items-center'>
      <div class='md:w-2/5 sm:w-full'>
        <img src= ${image_url} class='w-full h-full'/>
      </div>
      <div class='md:w-3/5 sm:w-full ml-3'>
        <div>
          <h1 class='lg:text-3xl md:text-base sm:text-text-2xl text-2xl smy-2 text-blue-800'> ${title} </h1>
          <p class=' lg:text-xl md:text-sm sm:text-base text-'>${
						details
							? details.length > 250
								? `${details.substring(0, 250)} ....`
								: details
							: "Not Found"
					}</p>
        </div>
        <div class='mt-3 flex justify-between'>
          <div class='flex items-center'>
            <div >
              <img src=${
								author.img
							} width='60px' height='60px' class='rounded-full' />
            </div>
            <div class='ml-3'>
              <h2 class='text-2xl text-blue-800'>${
								author.name ? author.name : "Not Found"
							}</h2>
              <span>${
								author.published_date ? author.published_date : "Not Found"
							}</span>
            </div>
          </div>
          <div class='text-2xl cursor-pointer'>
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
};

const displayCategories = async () => {
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
};

displayCategories();

fetchNews("08", "All News");
