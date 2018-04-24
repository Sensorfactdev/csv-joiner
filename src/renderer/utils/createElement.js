export default function createElement(type, content = '', attrs = []) {
  const el = document.createElement(type);

  Object.keys(attrs)
    .forEach((attr) => {
      el.setAttribute(attr, attrs[attr]);
    });

  el.innerHTML = content;
  return el;
}
