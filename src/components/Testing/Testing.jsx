import React from "react";
import "./Testing.css";

export default function Testing() {
  return (
    <div className="parent">
      <h1>Welcome to Testing</h1>
      <div className="cards">
        <div className="card first">
        <h2>First</h2>
        <p>Dish to Order</p>
        </div>
        <div className="card second">
            <h2>Second</h2>
            <p>Dish to Order</p>
        </div>
        <div className="card third">
            <h2>Third</h2>
            <p>Dish to Order</p>
        </div>
        <span className="hey">Hey</span>
      </div>
      <button className="clickme">Order Now</button>
      <div>Circle</div>
      <p>
        Ipsum cupidatat ex irure anim minim cupidatat exercitation non Lorem
        magna aliquip. Ipsum aliquip deserunt labore magna in laborum labore
        qui. Pariatur excepteur fugiat nostrud amet laboris est magna id tempor
        amet in et esse proident. Enim ut consectetur consectetur ut cillum
        laborum duis proident ipsum aliqua occaecat aliquip officia voluptate.
      </p>
      <p>
        {" "}
        Ipsum cupidatat ex irure anim minim cupidatat exercitation non Lorem
        magna aliquip. Ipsum aliquip deserunt labore magna in laborum labore
        qui. Pariatur excepteur fugiat nostrud amet laboris est magna id tempor
        amet in et esse proident. Enim ut consectetur consectetur ut cillum
        laborum duis proident ipsum aliqua occaecat aliquip officia voluptate.
      </p>
      <p>
        {" "}
        Ipsum cupidatat ex irure anim minim cupidatat exercitation non Lorem
        magna aliquip. Ipsum aliquip deserunt labore magna in laborum labore
        qui. Pariatur excepteur fugiat nostrud amet laboris est magna id tempor
        amet in et esse proident. Enim ut consectetur consectetur ut cillum
        laborum duis proident ipsum aliqua occaecat aliquip officia voluptate.
      </p>
      <table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>Data 3</td>
    </tr>
  </tbody>
</table>

    </div>
  );
}
