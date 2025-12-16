import { SERVER_ROUTE, CONFLICT_STATUS_CODE } from "../config";
const DataManager = function () {
  const addTab = (tabName, setTabs) => {
    fetch(`${SERVER_ROUTE}tabs/${tabName}`, { method: "POST" }).then((response) => {
      if (response.status === CONFLICT_STATUS_CODE) {
        console.log(response);
        alert(`The ${tabName} tab already exist.`)
      }
      else {
        updateTabsData(setTabs);
      }
    });
  };

  const addCategory = (name, tabID, setCategories) => {
    fetch(`${SERVER_ROUTE}categories/${tabID}/${name}`, {
      method: "POST",
    }).then((response) => {
      if (response.status === CONFLICT_STATUS_CODE) {
        alert(`The ${name} tab already exist.`)
      }
      else {
        updateCategories(tabID, setCategories);
      }
    });
  };

  const addBookmark = (bookmark, tabID, setCategories) => {
    fetch(`${SERVER_ROUTE}bookmarks`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(bookmark),
    }).then((response) => {
      if (response.status === CONFLICT_STATUS_CODE) {
        alert(`The ${bookmark.title} tab already exist.`)
      }
      updateCategories(tabID, setCategories);
    });
  };

  const deleteTab = (tabName, setTabs) => {
    fetch(`${SERVER_ROUTE}tabs/${tabName}`, {
      method: "DELETE",
    }).then(() => {
      updateTabsData(setTabs);
    });
  };

  const deleteCategory = (categoryID, tabID, setCategories) => {
    fetch(`${SERVER_ROUTE}categories/${categoryID}`, {
      method: "DELETE",
    }).then(() => {
      updateCategories(tabID, setCategories);
    });
  };

  const updateTabsData = (setTabs) => {
    fetch(`${SERVER_ROUTE}tabs`)
      .then((response) => {
        return response.json();
      })
      .then((tabs) => {
        setTabs(tabs);
      });
  };

  const updateCategories = (tabID, setCategories) => {
    fetch(`${SERVER_ROUTE}categories/${tabID}`)
      .then((response) => {
        return response.json();
      })
      .then((categories) => {
        setCategories(categories);
      });
  };

  const getBookmarks = (setMyBookmarks) => {
    fetch(`${SERVER_ROUTE}bookmarks`)
      .then((response) => {
        return response.json();
      })
      .then((bookmarks) => {
        setMyBookmarks(bookmarks);
      });
  };

  const deleteBookmark = (bookmarkID, setMyBookmarks) => {
    fetch(`${SERVER_ROUTE}bookmarks/${bookmarkID}`, {
      method: "DELETE",
    }).then(() => {
      getBookmarks(setMyBookmarks);
    });
  };

  return {
    addCategory, addBookmark, deleteCategory, updateCategories, addTab, updateTabsData, deleteTab,
    getBookmarks, deleteBookmark,
  };
};

export default DataManager;
