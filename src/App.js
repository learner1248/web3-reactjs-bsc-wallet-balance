import logo from "./logo.svg";
import "./App.css";

// useState hook'unu alalım
import { useState } from "react";

// Web3 sınıfını dahil edelim.
const Web3 = require("web3");

var ABI = [
  {"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}
];

function App() {
  // Web3 instance'i oluşturalım.
  const web3 = new Web3("https://bsc-dataseed1.binance.org:443");

  // Cüzdan kodu ve bakiyesini takip etmek ve tutmak için useState durumları belirtelim.
  const [address, setAddress] = useState("");
  const [get_balance, setBalance] = useState(0);
  const [contract_balance_of, setContractBalanceOf] = useState(0);

  // Cüzdan kodu inputu değiştiğinde çalıştırılacak
  const handleAddressChange = (e) => {
    // input'a girilen değeri address değişkenine kaydedelim
    setAddress(e.target.value);
    // Bir önceki cüzdanın bakiyesini göstermesin
    // vb. durumlar için cüzdan kodu inputları değiştiğinde bakiye durumunu 0 yapalım
    setBalance(0);
    setContractBalanceOf(0);
  };

  const getContractBalanceOf = async () => {
    // Contract nesnesini oluşturalım.
    const contract = await new web3.eth.Contract(ABI, address);

    let contractBalanceOf = 0;
    // Contract bakiyesini balanceOf methodu ile çağıralım.
    await contract.methods
      .balanceOf(address)
      .call()
      .then(function (balance) {
        contractBalanceOf = balance;
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("contractBalanceOf=" + contractBalanceOf);
    setContractBalanceOf(contractBalanceOf);
  };

  try {
    getContractBalanceOf();
    // Girilen cüzdan kodunun bakiyesini getirelim ve bakiyeyi get_balance değişkenine kaydedelim
    web3.eth.getBalance(address).then(setBalance);
  } catch (e) {
    // Cüzdan kodu hatalı vb. durumlarda (şimdilik sadece konsola) hata mesajını yazdıralım
    console.log(e.toString()); // Hata mesajını saf string olarak alabilmek için .toString() kullandık
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          [ <code>{address}</code> ]
        </p>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          style={{
            width: "40%",
            textAlign: "center",
            padding: "10px",
            color: "#fff",
            border: "2px solid #fff",
            backgroundColor: "#000",
          }}
          placeholder="Paste An Address"
        />
        <p>
          {/* Adres girilmiş, doğrulanmış veya sıfır değilse adres bakiyesi ve get_balance_of bölümünü yazdıralım. Aksi halde gösterilmesin. */}
          {get_balance !== 0 && ` ${"{ get_balance = "} ${get_balance} ${"}"} `}
          <br />
          {contract_balance_of !== 0 &&
            ` ${"{ contract_balance_of = "} ${contract_balance_of} ${"}"} `}
        </p>
      </header>
    </div>
  );
}

export default App;
