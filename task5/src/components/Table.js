import React, { Component, Fragment } from "react";
import products from "./products";

let categoryList = [];
let categoryFilter = [];
let manufacturerList = [];
let manufacturerFilter = [];
let maxPriceAllProductList = 0;

products.map((product) => {
    if (product.Price > maxPriceAllProductList) {
        maxPriceAllProductList = product.Price;
    }
    
});

let uniqueCategories = [
    ...new Map(products.map((item) => [item["Category"], item])).values(),
];
uniqueCategories.map((category) => {
    categoryList.push(category.Category);
});

let uniqueManufacturers = [
    ...new Map(products.map((item) => [item["Manufacturer"], item])).values(),
];
uniqueManufacturers.map((manufacturer) => {
    manufacturerList.push(manufacturer.Manufacturer);
});

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: products,
            display: "none",
            isDisplay: true,
            isExcept: true,
            isManufacturerExcept: true,
            minPrice: 0,
            maxPrice: maxPriceAllProductList,
        };
    }

    handleSideMenu = () => {
        this.setState({ isDisplay: !this.state.isDisplay });
        if (this.state.isDisplay) {
            this.setState({ display: "block" });
        } else {
            this.setState({ display: "none" });
        }
        manufacturerFilter=manufacturerList
    };

    handleApply = () => {
        let newProductList = [];
        let minPrice = parseInt(this.state.minPrice);
        let maxPrice = parseInt(this.state.maxPrice);

        this.setState({ isDisplay: !this.state.isDisplay });
        this.setState({ display: "none" });
        categoryFilter.map((category) => {
            if (category) {
                products.map((product) => {
                    manufacturerFilter.map((manufacturer) => {
                        if (
                            product.Manufacturer === manufacturer &&
                            product.Category === category &&
                            parseInt(product.Price) >= minPrice &&
                            parseInt(product.Price) <= maxPrice
                        ) {
                            newProductList.push(product);
                        }
                    });
                });
            }
        });

        this.setState({ products: newProductList });
    };

    handleReset = () => {
        this.setState({ isDisplay: !this.state.isDisplay });
        this.setState({ display: "none" });
        this.setState({ products: products });
        this.setState({ minPrice: 0 });
        this.setState({ maxPrice: maxPriceAllProductList });
        document
            .querySelectorAll("input[type=checkbox]")
            .forEach((el) => (el.checked = false));
    };

    handleExcept = () => {
        this.setState({ isExcept: !this.state.isExcept });
        if (this.state.isExcept) {
            categoryFilter = categoryList;
        } else {
            categoryFilter = [];
            document
                .querySelectorAll(".category")
                .forEach((el) => (el.checked = false));
        }
        console.log(categoryFilter)
    };

    handleCheck = (e) => {
        console.log(e.target.defaultValue);
        if (categoryFilter.indexOf(e.target.defaultValue) === -1) {
            categoryFilter.push(e.target.defaultValue);
        } else {
            categoryFilter.splice(
                categoryFilter.indexOf(e.target.defaultValue),
                1
            );
        }
        console.log(categoryFilter);
    };
    
    handleManufacturerExcept = () => {
        this.setState({
            isManufactureExcept: !this.state.isManufacturerExcept,
        });
        if (this.state.isExcept) {
            manufacturerFilter = manufacturerList;
        } else {
            manufacturerFilter = [];
            document
                .querySelectorAll(".manufacturer")
                .forEach((el) => (el.checked = false));
        }
    };
    handleManufacturer = (e) => {
        console.log(e.target.defaultValue);
        if (manufacturerFilter.indexOf(e.target.defaultValue) === -1) {
            manufacturerFilter.push(e.target.defaultValue);
        } else {
            manufacturerFilter.splice(
                manufacturerFilter.indexOf(e.target.defaultValue),
                1
            );
        }
        console.log(manufacturerFilter);
        console.log(manufacturerList);
    };

    handleSortName = () => {
        function compare(a, b) {
            if (a.Name < b.Name) {
                return -1;
            }
            if (a.Name > b.Name) {
                return 1;
            }
            return 0;
        }

        this.setState({ products: this.state.products.sort(compare) });
    };

    handleSortCategory = () => {
        function compare(a, b) {
            if (a.Category < b.Category) {
                return -1;
            }
            if (a.Category > b.Category) {
                return 1;
            }
            return 0;
        }

        this.setState({ products: this.state.products.sort(compare) });
    };

    handleSortPrice = () => {
        function compare(a, b) {
            if (a.Price < b.Price) {
                return -1;
            }
            if (a.Price > b.Price) {
                return 1;
            }
            return 0;
        }

        this.setState({ products: this.state.products.sort(compare) });
    };

    handleSortManufacturer = () => {
        function compare(a, b) {
            if (a.Manufacturer < b.Manufacturer) {
                return -1;
            }
            if (a.Manufacturer > b.Manufacturer) {
                return 1;
            }
            return 0;
        }

        this.setState({ products: this.state.products.sort(compare) });
    };

    handleSortProductionDate = () => {
        function compare(a, b) {
            if (a["Production Date"] < b["Production Date"]) {
                return -1;
            }
            if (a["Production Date"] > b["Production Date"]) {
                return 1;
            }
            return 0;
        }

        this.setState({ products: this.state.products.sort(compare) });
    };

    render() {
        let total = 0;
        let maxPrice = 0;
        let maxItem = "";
        let minPrice = 10000000;
        let minItem = "";

        this.state.products.map((product) => {
            total += product.Price;
            if (product.Price > maxPrice) {
                maxPrice = product.Price;
                maxItem = product.Name;
            }
            if (product.Price < minPrice) {
                minPrice = product.Price;
                minItem = product.Name;
            }
        });

        let average = 0;
        average = (total / this.state.products.length).toFixed(2);
        console.log(categoryList);
        
        return (
            <Fragment>
                <div
                    style={{
                        display: "flex",
                        marginLeft: "50px",
                        marginRight: "50px",
                    }}
                >
                    <div
                        style={{
                            flex: "1",
                            marginTop: "100px",
                            display: this.state.display,
                        }}
                    >
                        <h1>Menu</h1>
                        <form>
                            <button
                                style={{
                                    marginRight: "5px",
                                    marginTop: "50px",
                                }}
                                onClick={() => this.handleApply()}
                                type="button"
                            >
                                Apply
                            </button>
                            <button
                                style={{
                                    marginLeft: "5px",
                                    marginTop: "50px",
                                }}
                                onClick={() => this.handleReset()}
                                type="button"
                            >
                                Reset
                            </button>
                            <div style={{ marginTop: "50px" }}>
                                <h3>Filter by Category</h3>

                                <div
                                    style={{
                                        textAlign: "start",
                                        marginLeft: "20%",
                                    }}
                                >
                                    {categoryList.map((category, i) => {
                                        return (
                                            <Fragment key={i}>
                                                <input
                                                    type="checkbox"
                                                    name={`category${i}`}
                                                    className="category"
                                                    value={category}
                                                    onChange={(e) =>
                                                        this.handleCheck(e)
                                                    }
                                                />
                                                {category}
                                                <br />
                                            </Fragment>
                                        );
                                    })}
                                    <input
                                        type="checkbox"
                                        name="all_except"
                                        id="all"
                                        onChange={() => {
                                            this.handleExcept();
                                        }}
                                        style={{ marginTop: "10px" }}
                                    />
                                    All Except
                                </div>
                            </div>
                            <div style={{ marginTop: "50px" }}>
                                <h3>Filter By Price</h3>
                                <div>
                                    <label
                                        htmlFor="minPrice"
                                        style={{ margin: "10px" }}
                                    >
                                        minPrice
                                    </label>
                                    <input
                                        type="number"
                                        name="minPrice"
                                        placeholder="Min Price"
                                        max={this.state.maxPrice}
                                        value={this.state.minPrice}
                                        onChange={(e) => {
                                            this.setState({
                                                minPrice: e.target.value,
                                            });
                                        }}
                                        style={{ marginTop: "10px" }}
                                    ></input>
                                    <label
                                        htmlFor="maxPrice"
                                        style={{ margin: "10px" }}
                                    >
                                        maxPrice
                                    </label>
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        min={this.state.minPrice}
                                        placeholder="Max Price"
                                        value={this.state.maxPrice}
                                        onChange={(e) => {
                                            this.setState({
                                                maxPrice: e.target.value,
                                            });
                                        }}
                                        style={{ marginTop: "10px" }}
                                    ></input>
                                </div>
                            </div>
                            <div style={{ marginTop: "50px" }}>
                                <h3>Filter by Manufacturer</h3>

                                <div
                                    style={{
                                        textAlign: "start",
                                        marginLeft: "20%",
                                    }}
                                >
                                    {manufacturerList.map((manufacturer, i) => {
                                        return (
                                            <Fragment key={i}>
                                                <input
                                                    type="checkbox"
                                                    name={`manufacturer${i}`}
                                                    className="manufacturer"
                                                    value={manufacturer}
                                                    onChange={(e) =>
                                                        this.handleManufacturer(
                                                            e
                                                        )
                                                    }
                                                />
                                                {manufacturer}
                                                <br />
                                            </Fragment>
                                        );
                                    })}
                                    <input
                                        type="checkbox"
                                        name="all_exceptManufacturer"
                                        id="allmanufacturer"
                                        onChange={() => {
                                            this.handleManufacturerExcept();
                                        }}
                                        style={{ marginTop: "10px" }}
                                    />
                                    All Except
                                </div>
                            </div>
                        </form>
                    </div>
                    <div style={{ flex: "4", marginTop: "100px" }}>
                        <button
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginTop: "50px",
                            }}
                            onClick={() => this.handleSideMenu()}
                        >
                            Option
                        </button>
                        <table
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginTop: "50px",
                                width: "80%",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Total Quantity</th>
                                    <th>Total Cost</th>
                                    <th>Average Price</th>
                                    <th>Most Expensive</th>
                                    <th>Price</th>
                                    <th>Cheapest</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>{this.state.products.length}</td>
                                    <td>{total}</td>
                                    <td>{average}</td>
                                    <td>{maxItem}</td>
                                    <td>{maxPrice}</td>
                                    <td>{minItem}</td>
                                    <td>{minPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginTop: "50px",
                                width: "80%",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th
                                        style={{ cursor: "pointer" }}
                                        onClick={() => this.handleSortName()}
                                    >
                                        Name
                                    </th>
                                    <th
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            this.handleSortCategory()
                                        }
                                    >
                                        Category
                                    </th>
                                    <th
                                        style={{ cursor: "pointer" }}
                                        onClick={() => this.handleSortPrice()}
                                    >
                                        Price
                                    </th>
                                    <th
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            this.handleSortManufacturer()
                                        }
                                    >
                                        Manufacturer
                                    </th>
                                    <th
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            this.handleSortProductionDate()
                                        }
                                    >
                                        Production Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map((product, i) => {
                                    return (
                                        <tr key={product.Id}>
                                            <td>{i}</td>
                                            <td>{product.Name}</td>
                                            <td>{product.Category}</td>
                                            <td>{product.Price}</td>
                                            <td>{product.Manufacturer}</td>
                                            <td>
                                                {product["Production Date"]}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Table;
