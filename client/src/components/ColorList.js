import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from "./utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log(res)
      axiosWithAuth()
      .put('/colors')
      .then(res => {
        console.log(res)
        updateColors(res.data)
      })
      .catch(err => console.log('color list error', err))
      setEditing(false);
    })
    .catch(err => {
      console.log('color list err', err)
    })
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`/colors`, newColor)
    .then(res => {
      console.log(res)
      setNewColor(res.data)
      // props.history.push('/colors')
    })
    .catch(err => console.log('addcolor error', err))
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(() => {
      alert('Color is deleted')
      axiosWithAuth()
      .get('/colors')
      .then(res => {
        console.log(res)
        updateColors(res.data)
      })
      .catch(err => console.log(err))
      setEditing(false);
    })
    .catch(err => console.log('delete err', err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          Color name:
          <input
          onChange={e =>
            setNewColor({ ...newColor, color: e.target.value })
          }
          value={newColor.color}
          // type='text'
          // name='color' 
          />
        </label>
        <label>
          Hex code:
          <input
          onChange={e =>
            setNewColor({
              ...newColor,
              code: { hex: e.target.value }
            })
          } 
          value={newColor.code.hex}
          // type='text'
          // name='hex'
          />
        </label>
        <button type='submit' className='add-color'>Add New Color</button>
      </form>
    </div>
  );
};

export default ColorList;
