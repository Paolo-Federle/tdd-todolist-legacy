const TodoList = require("../src/TodoList.js")

describe("TodoList", () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
  })

  it("creates a todo item", () => {
    // set up
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: new Date().toDateString()
    }

    // execute
    const result = todoList.create("turn the heating on!")

    // verify
    expect(result).toEqual(expected)
  })

  it("returns all items", () => {
    // set up
    const item1 = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: new Date().toDateString()
    }
    const item2 = {
      id: 2,
      text: "Do the washing up",
      status: "incomplete",
      date: new Date().toDateString()
    }
    const expected = [item1, item2]

    // execute
    todoList.create("turn the heating on!")
    todoList.create("Do the washing up")

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it("sets item to be complete if found", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "complete",
      date: new Date().toDateString()
    }

    // execute
    const result = todoList.setComplete(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it("throws error if not found", () => {
    // set up

    // execute, verify
    expect(() => todoList.setComplete(1)).toThrowError("Item not found")
  })

  it("gets incomplete items", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const item2 = todoList.create("Do the washing up")
    todoList.setComplete(item1.id)
    const expected = [item2]

    // execute
    const result = todoList.getByStatus("incomplete")

    // verify
    expect(result).toEqual(expected)
  })

  it("gets complete items", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const item2 = todoList.create("Do the washing up")
    todoList.setComplete(item1.id)
    const expected = [item1]

    // execute
    const result = todoList.getByStatus("complete")

    // verify
    expect(result).toEqual(expected)
  })

  it("finds item by id", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: new Date().toDateString()
    }

    // execute
    const result = todoList.findBy(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it("findBy throws error if not found", () => {
    // set up

    // execute, verify
    expect(() => todoList.findBy(1)).toThrowError("Item not found")
  })

  it("deletes item by id", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: new Date().toDateString()
    }

    // execute
    const deletedItem = todoList.deleteBy(1)

    // verify
    expect(deletedItem).toEqual(expected)
    expect(todoList.showAll()).toEqual([])
  })

  it("delete throws error if not found", () => {
    // set up

    // execute, verify
    expect(() => todoList.deleteBy(1)).toThrowError("Item not found")
  })

  it("Show only the first 20chars when displaying all items", () => {
    // set up
    for (let i = 0; i < 3; i++) {
      todoList.create(`activity number ${i} which mean that`)
    }

    // execute
    todoList.showAllReduced()

    // verify
    expect(todoList.showAllReduced()).toEqual([{
      id: 1,
      text: "activity number 0 wh...",
      status: "incomplete",
      date: new Date().toDateString()
    },
    {
      id: 2,
      text: "activity number 1 wh...",
      status: "incomplete",
      date: new Date().toDateString()
    },
    {
      id: 3,
      text: "activity number 2 wh...",
      status: "incomplete", date: new Date().toDateString()

    }])
  })

  it("To do items have dates when they were created", () => {
    // set up
    const item1 = todoList.create("cook pasta!")

    // execute

    // verify
    expect(todoList.showAll()[0].date).toBe(new Date().toDateString())
  })

  it('search by day and see a list of todo items by the day they were created', () => {
    // set up
    todoList.create('cook carbonara')
    todoList.create('Do shower')
    todoList.create('finish exercise')
    // execute

    // verify
    expect(todoList.filterDay(new Date().toDateString().substring(0, 3)).length).toBe(3)
  })

  it('If there are no todos for that day, show an empty list', () => {
    // set up
    todoList.create('cook carbonara')
    todoList.create('Do shower')
    todoList.create('finish exercise')
    const tomorrow = new Date().getDate()+1
    // execute

    // verify
    expect(todoList.filterDay(tomorrow).length).toBe(0)
  })

})
