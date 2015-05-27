window.on_resize = function (main_elem, elem_h) {
	var elem = document.getElementById('ProdCont');
	if (elem && elem.previousElementSibling) {
		elem.style.height = (elem_h - elem.previousElementSibling.offsetHeight - 15) + 'px';
	}
}