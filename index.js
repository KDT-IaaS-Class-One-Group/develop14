export function load(){
  document.addEventListener('DOMContentLoaded',function(){
    function createElement(type,props,...children){
      return {type, props, children}
    }
    function component(stateData){
      //  매개변수로 stateData로 놓았는데
      //  상태데이타개념은 그냥 데이타랑 다른 개념이 뭘까?
      const menuItems = [];
      for(let i=0; i<stateData.length; i++){
        const item = stateData[i]
        const menuItem = createElement('li',{},createElement('a',{href: item.hash}, item.text))
        menuItems.push(menuItem)
      }
      const menu = createElement('ul',{}, ...menuItems)
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