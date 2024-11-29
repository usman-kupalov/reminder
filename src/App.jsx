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

function App() {
  const [items, setItems] = useLocalStorage('data');

  const addItems = (item) => {
    setItems([...mapItems(items), {
      ...item,
      date: new Date(item.date),
      id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
    }]);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList items={mapItems(items)} />
        </LeftPanel>

        <Body>
          <JournalForm onSubmit={addItems} />
        </Body>
      </div>
    </UserContextProvider>
  );
}


export default App;
