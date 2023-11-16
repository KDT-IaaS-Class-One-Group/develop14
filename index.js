export function load(){
  document.addEventListener('DOMContentLoaded',function(){
    function createElement(type,props,...children){
      // createElement함수는 react에서 ui를 만들기 위한 핵심 함수 중 하나로, 가상 DOM에 삽입되는 React 엘리먼트를 반환한다.
      // createElement(type,[props],[...children])
      // type: 엘리먼트의 타입을 나타내는 문자열 또는 React 컴포넌트입니다.
      // props: 엘리먼트의 속성을 나타내는 객체로, 생략 가능합니다.
      // children: 엘리먼트의 자식 요소를 나타내는 인자로, 생략 가능하며 여러 개의 인자를 받을 수 있습니다.
      return {type, props, children}
    }
    function component(stateData){
      //?  매개변수로 stateData로 놓았는데 상태데이타개념은 그냥 데이타랑 다른 개념이 뭘까?
      const menuItems = [];
      for(let i=0; i<stateData.length; i++){
        const item = stateData[i]
        // 상태데이터에 있는 데이터(메뉴목록)들로 해쉬태그 기능의 a태그 속성을 가진 li태그를 나열한다.
        const menuItem = createElement('li',{},createElement('a',{href: item.hash}, item.text))
        menuItems.push(menuItem)
      }
      const menu = createElement('ul',{}, ...menuItems) // 이게 뭔지 모르겠어요
      const content = createElement('div',{},'Hello React')
      return createElement('div',{},menu,content)
    }
    function render(virtualDom){
      if(typeof virtualDom === 'string'){
        return document.createTextNode(virtualDom)
      }
      const element = document.createElement(virtualDom.type)
      if(virtualDom.props){
        for(const[key,value] of Object.entries(virtualDom.props)){
          element.setAttribute(key,value)
        }
      }
      for(let i=0; i<virtualDom.children.length; i++){
        const child = virtualDom.children[i]
        element.appendChild(render(child))
      }
      return element
    }

    // test
    const stateData = [
      // {hash: '#test', text: 'Test'},
      {hash: '#home', text:'Home'},
      {hash: '#about', text: 'About'},
      {hash: '#services', text: 'Services'},
      {hash: '#portfolio', text: 'portfolio'},
      {hash: '#contact', text: 'Contact'}
    ]
    const virtualDom = component(stateData)
    const container = document.getElementById('root')
    container.appendChild(render(virtualDom))
    console.dir(container)
    console.dir(virtualDom)
  })
}