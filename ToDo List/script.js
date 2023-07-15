let calc_str = "";
let calc_input = document.getElementById("calc-id");
let bool = false;

function appendtoValue(val) {
    if(bool){
        clearAll();
        bool = false;
    }
  calc_input.value += val;
  calc_str = calc_input.value;
}

function delValue() {
  let len = calc_str.length - 1;
  calc_input.value = calc_str.slice(0, len);
  calc_str = calc_input.value;
}

function clearAll() {
  calc_input.value = "";
  calc_str = calc_input.value;
}

function evalResult() {
  try {
    calc_input.value = eval(calc_str);
  } catch (e) {
    calc_input.value = "Error Occured";
  }
  finally{
    bool = true;
  }
}
