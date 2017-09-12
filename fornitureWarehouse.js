//list of raw elements stored in warehouse
var rawElements = [
    {
		ID: 1,
        name: "shelf",
        quantity: 20
	},
    {
		ID: 2,
        name: "door",
        quantity: 32
	},
    {
		ID: 3,
        name: "grip",
        quantity: 12
	},
    {
		ID: 4,
        name: "screw",
        quantity: 2000
	}
    
];

//list of fornitures stored in warehouse
var fornitures = [
    {
		ID: 1,
        price: 11,
        quantity: 2,
		elements : 
        [
            {
                ID : 1,
                quantity : 2
            },
            {
                ID : 2,
                quantity : 2
            },
            {
                ID : 4,
                quantity : 250
            }
        ]
	},
    {
		ID: 2,
        price: 30,
        quantity: 5,
		elements : 
        [
            {
                ID : 1,
                quantity : 4
            },
            {
                ID : 3,
                quantity : 4
            },
            {
                ID : 4,
                quantity : 500
            }
        ]
	},
    {
		ID: 3,
        price: 2,
        quantity: 20,
		elements : 
        [
            {
                ID : 2,
                quantity : 2
            },
            {
                ID : 4,
                quantity : 20
            }
        ]
	},
    {
		ID: 4,
        price: 134,
        quantity: 1,
		elements : 
        [
            {
                ID : 1,
                quantity : 2
            },
            {
                ID : 2,
                quantity : 2
            },
            {
                ID : 3,
                quantity : 5
            },
            {
                ID : 4,
                quantity : 700
            }
        ]
	}
];


/** 
 * @brief getter of fornitures
 * @return fornitures
 */
var getFornitures = function getFornitures(){
    return fornitures;
}

/** 
 * @brief getter of rawElements
 * @return rawElements
 */
var getRawElements = function getRawElements(){
    return rawElements;
}

/** 
 * @brief it searches one elements in fornitures, given the ID of the element, and returns the position
 * @param fornitureID
 * @return the position of element searched, null otherwise
 */
var searchPosForniture = function searchPosForniture(fornitureID)
{
    //search for the elements
    for (i=0; i < fornitures.length; i++)
	{
		if (fornitures[i].ID == fornitureID)
		{
			return i;
		}
    }
    
    return null;
}

/** 
 * @brief it searches one elements in fornitures, given the ID of the element, and returns the element
 * @param fornitureID
 * @return the element searched, null otherwise
 */
var searchForniture = function searchForniture(fornitureID)
{
    //search for the elements
    var position = searchPosForniture(fornitureID);
    
    if (position==null)
        return null;
    else
        return fornitures[position];
}

/** 
 * @brief it searches one elements in rawElement, given the ID of the element, and returns the position
 * @param rawwElementID
 * @return the position of the element searched, null otherwise
 */
var searchPosRawElement = function searchPosRawElement(rawElementID)
{
    //search the elements
    for (i=0; i < rawElements.length; i++)
	{
		if (rawElements[i].ID == rawElementID)
		{
			return i;
		}
    }
    
    return null;
}


/**
 * @brief This function decreases the quantity of an element, given its ID
 * @param fornitureID
 * @return the item that it is sold (with the updated quantity), null if the item does not exist.
 */
var sellForniture = function sellForniture(fornitureID)
{
    //search for the element
    var position = searchPosForniture(fornitureID);
    
    if (position!=null && fornitures[position].quantity!=0)
        {
            //update quantity
            fornitures[position].quantity=fornitures[position].quantity-1;    
            
            return fornitures[position];
        }
    else
        return null;
}


//export functions
exports.getFornitures = getFornitures; 
exports.getRawElements = getRawElements; 
exports.searchForniture = searchForniture; 
exports.searchPosForniture = searchPosForniture; 
exports.searchPosRawElement = searchPosRawElement; 
exports.sellForniture = sellForniture; 