import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App, {Todo, TodoForm, useTodos} from "./App";

configure({adapter: new Adapter()})

describe("App", () => {
  describe("Todo", () =>{
    it("ejecuta completeTodo cuando picncho Complete", ()=> {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isCompleted: true,
        text: "lala",
      };
      const wrapper = shallow(
      <Todo
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        index={index}
        todo={todo}
       />
       );
       wrapper.find("button").at(0).simulate("click");
       expect(completeTodo.mock.calls).toEqual([[5]]);
       expect(removeTodo.mock.calls).toEqual([]);
    });
    it("ejecuta removeTodo cuando picncho x", ()=> {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isCompleted: true,
        text: "lala",
      };
      const wrapper = shallow(
      <Todo
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        index={index}
        todo={todo}
       />
       );
       wrapper.find("button").at(1).simulate("click");
       expect(removeTodo.mock.calls).toEqual([[5]]);
       expect(completeTodo.mock.calls).toEqual([]);
    });
  });
  describe("TodoForm",()=>{
    it("llamar a addTodo cuando el formulario tiene un valor",()=>{
      const addTodo = jest.fn();
      const prevent = jest.fn();
      const wrapper = shallow(
        <TodoForm 
        addTodo={addTodo}
        />
      );
      wrapper.find("input").simulate("change", {target:{value:"mi nuevo todo!"}});
      wrapper.find("form").simulate("submit", {preventDefault: prevent});
      // wrapper.find("form").simulate("submit", {preventDefault: () => {}})
      expect(addTodo.mock.calls).toEqual([["mi nuevo todo!"]]);
      expect(prevent.mock.calls).toEqual([[]]);
    });
  });
  describe("custom hook: useTodos", () => {
    it("addTodo", () => {
      const Test = (props) => {
        const hook = props.hook();
        return <div{ ...hook }></div>
      }
      const wrapper = shallow(<Test hook={useTodos} />);
      // busco los elementos div
      let props = wrapper.find("div").props();
      props.addTodo("texto de prueba");
      // renuevo los elementos div
      props = wrapper.find("div").props();
      expect(props.todos[0]).toEqual({ text: "texto de prueba" });
    });
    it("completeTodo", () => {
      const Test = (props) => {
        const hook = props.hook();
        return <div{ ...hook }></div>
      }
      const wrapper = shallow(<Test hook={useTodos} />);
      // busco los elementos div
      let props = wrapper.find("div").props();
      props.completeTodo(0);
      // renuevo los elementos div
      props = wrapper.find("div").props();
      expect(props.todos[0]).toEqual({ text: "Todo 1", isCompleted: true });
    });
    it("removeTodo", () => {
      const Test = (props) => {
        const hook = props.hook();
        return <div{ ...hook }></div>
      }
      const wrapper = shallow(<Test hook={useTodos} />);
      // busco los elementos div
      let props = wrapper.find("div").props();
      props.removeTodo(0);
      // renuevo los elementos div
      props = wrapper.find("div").props();
      expect(props.todos).toEqual([{
        text: "Todo 2",
        isCompleted: false
      },
      {
        text: "Todo 3",
        isCompleted: false
      }]);
    });

    it("App",() =>{
      const wrapper = mount(<App />);
      const prevent = jest.fn();
      wrapper.find("input").simulate("change",{target: {value: "mi todo!"}} );
      wrapper.find("form").simulate("submit", {prenventDefault: prevent});
      // if we need to search for the id use #
      // at is used to spacify the index of the list 
      // text transform the result into a text
      // include is to make a question if the
      // text "mi todo!" is on the element
      // return true
      const respuesta = wrapper.find(".todo").at(0).text().includes("mi todo!");
      expect(respuesta).toEqual(true);
      expect(prevent.mock.calls).toEqual([[]]);

    });
  });
  });

