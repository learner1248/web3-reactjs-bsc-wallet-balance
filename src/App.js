import logo from './logo.svg';
import './App.css';

// useState hook'unu alalım
import { useState } from 'react';

// Web3 sınıfını dahil edelim.
const Web3 = require('web3');

function App() {
  // Web3 instance'i oluşturalım.
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
  
  // Cüzdan kodu ve bakiyesini takip etmek ve tutmak için useState durumları belirtelim.
  const [wallet_code, setWalletCode] = useState('');
  const [wallet_balance, setWalletBalance] = useState(0);

  // Cüzdan kodu inputu değiştiğinde çalıştırılacak
  const handleWalletCodeChange = e => {
    // input'a girilen değeri wallet_code değişkenine kaydedelim
    setWalletCode(e.target.value);
    // Bir önceki cüzdanın bakiyesini göstermesin
    // vb. durumlar için cüzdan kodu inputları değiştiğinde bakiye durumunu 0 yapalım
    setWalletBalance(0);
  }

  try {
    // Girilen cüzdan kodunun bakiyesini getirelim ve bakiyeyi wallet_balance değişkenine kaydedelim
    web3.eth.getBalance(wallet_code).then(setWalletBalance);
  } catch (e) { // Cüzdan kodu hatalı vb. durumlarda (şimdilik sadece konsola) hata mesajını yazdıralım
    console.log(e.toString()); // Hata mesajını saf string olarak alabilmek için .toString() kullandık
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          [ <code>{wallet_code}</code> ]
        </p>
        <input type="text" value={wallet_code} onChange={handleWalletCodeChange} style={{width: '40%', textAlign: 'center', padding: '10px', color: '#fff', border: '2px solid #fff', backgroundColor: '#000'}} placeholder="Write A Wallet Code"/>
        <p>
        {/* Cüzdan kodu girilmiş, doğrulanmış veya sıfır değilse cüzdan bakiyesi bölümünü yazdıralım. Aksi halde gösterilmesin. */}
        { wallet_balance !== 0 && ` ${'{'} ${wallet_balance} ${'}'} ` }
        </p>
      </header>
    </div>
  );
}

export default App;
