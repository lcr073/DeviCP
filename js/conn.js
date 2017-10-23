window.onload = function() {
	

	botao = document.querySelector("#logar");
	usuario = document.querySelector("#user");
	pass = document.querySelector("#password");
	
	// Criacao de conta
	create = document.querySelector("#criar");
	nome = document.querySelector("#nome");	
	account = document.querySelector("#account");
	senha = document.querySelector("#pass");
	email = document.querySelector("#email");	
	sexo = document.querySelector("#sexo");	
	data_nascimento = document.querySelector("#data_nascimento");	
	
	
	// Criando char
	createChar = document.querySelector("#criarChar");
	nomeChar = document.querySelector("#nomeChar");	
	estCabelo = document.querySelector("#est_cabelo");
	corCabelo = document.querySelector("#cor_cabelo");
	sexo = document.querySelector("#sexo");	
	corOlhos = document.querySelector("#cor_olhos");	
	str = document.querySelector("#str");
	agi = document.querySelector("#agi");
	dex = document.querySelector("#dex");
	inti = document.querySelector("#inti");		
	luk = document.querySelector("#luk");	

	
   	$('#charSel').hide(true);
	$('#charCreate').hide(true);
	$('#accountCreate').hide(true);
   
    // Pegando as referências para os elementos da página.
    var form = document.getElementById('mensagem-formulario');
 
   
    // Criando uma nova WebSocket.
    var socket = new WebSocket('ws://127.0.0.1:8887');
   
   
    // segurando os erros que ocorrerem.
    socket.onerror = function(error) {
      console.log('erros do WebSocket: ' + error);
    };
   
   
    // Mostrando a mensagem de Conectado quando o WebSocket for aberto.
    socket.onopen = function(event) {
		console.log('Conectado com: ' + event.currentTargetURL);
    };
   
    // Pegando as mensagens enviadas pelo servidor.
    socket.onmessage = function(event) {
		var mensagem = event.data;
		console.log('Mensagem recebida:' + mensagem);
		msg = mensagem.split(":");
		
		if(msg[0] == "iC"){
			$("#login").hide(1000);
			$('#charSel').show(1000);
			$('#charSel tr:last').after('<tr><td> <input type="radio" name="charSelect" value="'+msg[1]+'"> ID:'+ msg[1]  +  '\n Nome:' + msg[2] + '</td></tr>');				
			
		}
		
		if(msg[0] == "sC"){
			$("#login").hide(1000);
			alert("Sua conta nao possui nenhum personagem !")
			$('#charCreate').show(1000);
			//$('#charSel tr:last').after('<tr><td> <input type="radio" name="charSelect" value="'+msg[1]+'"> ID:'+ msg[1]  +  '\n Nome:' + msg[2] + '</td></tr>');				
			
		}
		

		
		if(event.data == "Logou"){
	
			socket.send("c")
			console.log('Solicitacao de char enviada');
		}
		
		
		if(event.data == ""){
			var charTable = document.querySelector("#charSel");
			charTable.appendChild(charInfo);
			
		}
    };
	
			$('#charSelect').click(function(){
				var radio = $('input[name=charSelect]:checked').val();
				socket.send('iCS:' +radio);
				//console.log('radio' + radio);
				});
   
    //Mostrando a mensagem de desconectado quando o websocket for fechado.
    socket.onclose = function(event) {
		console.log('Desconectado');
    };
   
    //Enviando uma mensagem quando o formulário for submetido.
  /*  form.onsubmit = function(e) {
      e.preventDefault();
   
      // Recuperando a mensagem do textarea.
      var mensagem = mensagemTexto.value;
   
      // Enviando a mensagem através do WebSocket.
      //socket.send(mensagem);
		socket.send("bau")
   
      return false;
    };
	*/

// Casos de teste	
    //botao.onclick = function(e) {
		// Usuario e senha com comprimento incorreto
	  //socket.send("l" + ":" +  "jose" +  ":" + "1234");
	  // Usuario inexistente
	  //socket.send("l" + ":" +  "jose153" +  ":" + "1234567");
	  // Senha incorreta
	  //socket.send("l" + ":" +  "pericles" +  ":" + "12323237");
	  // Usuario e senha corretos
	  //socket.send("l" + ":" +  "pericles" +  ":" + "1234567");	  
	  // login valido
	  //socket.send("l" + ":" +  "pericles" +  ":" + "1234567");	  
	  // login invalido
	  //socket.send("l" + ":" +  "pericles" +  ":" + "12aw34567");	  


	  //Tornando login valido		
	  //socket.send("l" + ":" +  "pericles" +  ":" + "1234567");	  
	  //socket.send("c");		  
	  
	  //Tornando login valido		
	  //socket.send("l" + ":" +  "baubau" +  ":" + "bautazar");	  
	  //socket.send("c");	  	  
	  
	  //Tornando login valido		
	  //socket.send("l" + ":" +  "vasco1" +  ":" + "beef12");	  
	  //socket.send("c");	  

	  //Usuario nao logado		
	  //socket.send("c");

	  //Usuario nao logado		
	  //socket.send("l" + ":" +  "pericles" +  ":" + "1234567");	  	  
	  //socket.send("iCS");	  
	  
	  //Usuario nao logado		
	  //socket.send("iCS");	  
	  
  	  //Usuario nao logado		
	  //socket.send("i");

	  	  // Usuario nao logado		
	 //  socket.send("v");	  
     // return false;
    //};
	
    //Fechando a conexão WebSocket quando o botão for clicado.
    botao.onclick = function(e) {
       //  alert("bau");
      // Fechando o WebSocket.
	  socket.send("l" + ":" +  usuario.value +  ":" + password.value);
	//	var infoLogin = {tag : "l", user : usuario.value, pass : password.value};
	//	socket.send(JSON.stringify(infoLogin));
//	  console.log(user.value);
//	  socket.send(user.value);
//	  socket.send(password.value);
      //socket.close();
      return false;
    };
	
	
    create.onclick = function(e) {
	  socket.send("iCA" + ":" + nome.value  + ":"  +  account.value +  ":" + senha.value + ":" + email.value);
      return false;
    };	
	
	createChar.onclick = function(e) {
	  socket.send("iCC" + ":" + nomeChar.value + ":" + estCabelo.value + ":" + corCabelo.value + ":" + sexo.value + ":" + corOlhos.value + ":" + str.value + ":" + agi.value + ":" + dex.value + ":" + inti.value + ":" + luk.value);
      return false;
    };
  };