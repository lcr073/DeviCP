window.onload = function() {
	

	botao = document.querySelector("#logar");
	user = document.querySelector("#user");
	pass = document.querySelector("#password");
   	$('#charSel').hide(true);
   
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
	

	
    //Fechando a conexão WebSocket quando o botão for clicado.
    botao.onclick = function(e) {
       //  alert("bau");
      // Fechando o WebSocket.
	  socket.send("l" + ":" +  user.value +  ":" + password.value);
//	  console.log(user.value);
//	  socket.send(user.value);
//	  socket.send(password.value);
      //socket.close();
      return false;
    };
  };