import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InventoryPage() {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const [recipe, setRecipe] = useState('');
  const backendHost = "http://localhost:5000"; //"http://34.233.181.229:5000"; // "http://localhost:5000";

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(`${backendHost}/api/food-items`);
      setFoodItems(response.data);
      console.log(response.data)
      console.log(foodItems)
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedItem((prevItem) => {
      const [category, field] = name.split('.');
      if (category === 'nutrition_facts') {
        return {
          ...prevItem,
          Details: {
            ...prevItem.Details,
            nutrition_facts: {
              ...prevItem.Details.nutrition_facts,
              [field]: value,
            },
          },
        };
      } else {
        return {
          ...prevItem,
          Details: {
            ...prevItem.Details,
            [category]: value,
          },
        };
      }
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`${backendHost}/api/food-items/${selectedItem.ItemID}`, selectedItem);
      console.log('Changes saved successfully');
      fetchFoodItems(); // Refetch the food items after saving changes
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleRecipeRequest = async () => {
    try {
      const recipeItemNames = recipeList.map(item => item.Details.name);
      
      const response = await axios.post(`${backendHost}/api/recipe-request`, { items: recipeItemNames });
      setRecipe(response.data.recipe); // Assuming the backend sends back a field named 'recipe'
      // Optionally clear the recipe list after getting the recipe
      setRecipeList([]);
    } catch (error) {
      console.error('Error sending recipe request:', error);
      // Optionally handle and display error to the user
    }
  };

  const addToRecipeList = (item) => {
    setRecipeList((currentList) => [...currentList, item]);
  };

  const removeFromRecipeList = (indexToRemove) => {
    setRecipeList((currentList) => currentList.filter((_, index) => index !== indexToRemove));
  };

  const handleAddBarcode = async (itemId) => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        formData.append('itemId', itemId);

        await axios.post(`${backendHost}/api/add-barcode`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Barcode added successfully');
      };
      input.click();
    } catch (error) {
      console.error('Error adding barcode:', error);
      alert('Error adding barcode');
    }
  };

  return (
    <div className="inventory-page">
      <div className="content">
        {foodItems.length > 0 ? (
          foodItems.map((item, index) => (
            <div key={index} className="food-item" onClick={() => handleItemClick(item)}>
              {item.Details.product_name}
              <button onClick={(e) => {
                e.stopPropagation();
                addToRecipeList(item);
              }}>+</button>
              <button onClick={(e) => {
                e.stopPropagation();
                handleAddBarcode(item.ItemID);
              }}>Add Barcode</button>
            </div>
          ))
        ) : (
          <p>No Items Currently In Inventory</p>
        )}

        {selectedItem && (
          <div className="details-table">
            <input
              type="text"
              name="name"
              value={selectedItem.Details.product_name || ''}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="nutrition_facts.serving_size"
              value={"Serving Size: " + selectedItem.Details.serving_size || ''}
              onChange={handleInputChange}
              placeholder="Serving Size: " 
            />
            <input
              type="text"
              name="nutrition_facts.calories"
              value={"Calories: " + selectedItem.Details.calories || ''}
              onChange={handleInputChange}
              placeholder="Calories: "
            />
            <input
              type="text"
              name="nutrition_facts.total_fat"
              value={"Total Fat: " + selectedItem.Details.total_fat || ''}
              onChange={handleInputChange}
              placeholder="Total Fat: "
            />
            <input
              type="text"
              name="nutrition_facts.sodium"
              value={"Sodium: " + selectedItem.Details.sodium || ''}
              onChange={handleInputChange}
              placeholder="Sodium: "
            />
            <input
              type="text"
              name="nutrition_facts.total_carbohydrates"
              value={"Total Carbohydrates: " + selectedItem.Details.carbohydrates || ''}
              onChange={handleInputChange}
              placeholder="Total Carbohydrates: "
            />
            <input
              type="text"
              name="nutrition_facts.sugars"
              value={"Sugars: " + selectedItem.Details.sugar || ''}
              onChange={handleInputChange}
              placeholder="Sugars: "
            />
            <input
              type="text"
              name="nutrition_facts.protein"
              value={"Protein: " + selectedItem.Details.protein || ''}
              onChange={handleInputChange}
              placeholder="Protein: "
            />
            <input
              type="text"
              name="ingredients"
              value={"Ingredients: " + selectedItem.Details.ingredients || ''}
              onChange={handleInputChange}
              placeholder="Ingredients: "
            />
            <input
              type="text"
              name="expiration_date"
              value={"Expiration Date: " + selectedItem.Details.expiration_date || ''}
              onChange={handleInputChange}
              placeholder="Expiration Date: "
            />
            <input
              type="text"
              name="quantity"
              value={"Quantity: " + selectedItem.Details.quantity || ''}
              onChange={handleInputChange}
              placeholder="Quantity: "
            />
            <button onClick={handleSaveChanges}>Save</button>
          </div>
        )}

        <div>
          <h4>Recipe List:</h4>
          {recipeList.length > 0 ? (
            recipeList.map((item, index) => (
              <div key={index} className="food-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.Details.product_name}</span>
                <button onClick={() => removeFromRecipeList(index)}>-</button>
              </div>
            ))
          ) : (
            <p>No items added to the recipe list.</p>
          )}
          <button onClick={handleRecipeRequest} className="recipe-button">Get Recipe</button>
          {recipe && (
            <div className="recipe-display">
              <h3>Recipe</h3>
              <p>{recipe}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;