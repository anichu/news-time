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

const fetchNews = (id) => {};

const displayCategories = async () => {
	const categories = await fetchCategories();
	const subNav = document.getElementById("sub-nav");
	let html = "";
	categories.forEach((category) => {
		const { category_name: name, category_id: id } = category;
		html += `
    <li class='mx-3 my-2 text-xl font-semibold hover:text-blue-800 active:text-blue-800'>
      <a href='#' onclick='fetchNews(${id})' >${name}</a>
    </li>
    `;
	});
	subNav.innerHTML = html;
};

//fetchCategories();
displayCategories();
