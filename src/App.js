import logo from './logo.svg';
import './App.css';

// useState hook'unu alalım
import { useState } from 'react';

// Web3 sınıfını dahil edelim.
const Web3 = require('web3');

var ABI = [
  {"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}
];

function App() {
  // Web3 instance'i oluşturalım.
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

  // Cüzdan kodu ve bakiyesini takip etmek ve tutmak için useState durumları belirtelim.
  const [wallet_code, setWalletCode] = useState('');
  const [wallet_balance, setWalletBalance] = useState(0);
  const [contract_balance, setContractBalance] = useState(0);

  // Cüzdan kodu inputu değiştiğinde çalıştırılacak
  const handleWalletCodeChange = e => {
    // input'a girilen değeri wallet_code değişkenine kaydedelim
    setWalletCode(e.target.value);
    // Bir önceki cüzdanın bakiyesini göstermesin
    // vb. durumlar için cüzdan kodu inputları değiştiğinde bakiye durumunu 0 yapalım
    setWalletBalance(0);
    setContractBalance(0);
  }

  const getContractBalance = async () => {
    // Contract nesnesini oluşturalım.
    const contract = await new web3.eth.Contract(ABI, wallet_code);

    let contractBalance = 0;
    // Contract bakiyesini balanceOf methodu ile çağıralım.
    await contract.methods.balanceOf(wallet_code).call().then(function (balance) {
      contractBalance = balance;
    }).catch(function(error) {
      console.log(error);
    });
    console.log('contractBalance='+contractBalance);
    setContractBalance(contractBalance);
  }

  try {
    getContractBalance();
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
        { wallet_balance !== 0 && ` ${'{ wallet_balance = '} ${wallet_balance} ${'}'} ` }
        <br />
        { contract_balance !== 0 && ` ${'{ contract_balance = '} ${contract_balance} ${'}'} ` }
        </p>
      </header>
    </div>
  );
}

export default App;
