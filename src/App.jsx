import './App.css';
import { Body } from './layouts/Body/Body.jsx';
import { LeftPanel } from './layouts/LeftPanel/LeftPanel.jsx';
import { Header } from './components/Header/Header.jsx';
import { JournalList } from './components/JournalList/JournalList.jsx';
import { JournalAddButton } from './components/JournalAddButton/JournalAddButton.jsx';
import { JournalForm } from './components/JournalForm/JournalForm.jsx';
import { useLocalStorage } from './hooks/Use-localStorage.hook.js';
import { mapItems } from './utils/mapping.js';
import { UserContextProvider } from './context/UserContext.jsx';
import { useState } from 'react';

function App() {
  const [items, setItems] = useLocalStorage('data');
  const [selectedItem, setSelectedItem] = useState(null);

  const addItems = (item) => {
    if (!item.id) {
      setItems([...mapItems(items), {
        ...item,
        date: new Date(item.date),
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
      }]);
    } else {
      setItems([...mapItems(items).map(i => {
        if (i.id === item.id) {
          return { ...item };
        } else {
          return i;
        }
      })]);
    }
  };

  const deleteItem = (id) => {
    setItems([...items.filter(i => i.id !== id)]);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton clearForm={() => setSelectedItem(null)} />
          <JournalList items={mapItems(items)} setItem={setSelectedItem} />
        </LeftPanel>

        <Body>
          <JournalForm onSubmit={addItems} onDelete={deleteItem} data={selectedItem} />
        </Body>
      </div>
    </UserContextProvider>
  );
}


export default App;
