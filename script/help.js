const openModal = () => {
	const modalHtml = `
		<div id="help-modal" class="modal fade">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">Ajuda</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-12">
                                <div class="alert alert-info">
                                    <h4>Criando e visualizando eventos</h4>
                                    <ul>
                                        <li>Para criar um novo evento, clique no quadrado do dia em que deseja criar o evento, caso esteja no gráfico de semana ou dia, você pode clicar e arrastar do horário de início até o horário de fim, depois preencha o formulário e clique em salvar.</li>
                                        <li>Para visualizar um evento, clique no evento, um formulário irá aparecer contendo os dados já preenchidos.</li>
                                        <li>Para alterar um evento, clique no evento e altere os dados preenchidos no formulário, depois clique em editar.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
						<div class="row">
                            <div class="col-md-11">
                                <b>Gráfico Mensal</b>
                                <ul>
                                    <li>
										Os eventos com horas no início são eventos com começo e fim definidos.
                                        <div class="fc-event" style="width: 150px;"><div class="fc-event-inner primarybg"><b>10:30</b> Evento<div></div>
									</li>
                                    <li>
										Os eventos que não apresentam horas são eventos que duram o dia todo.
										<div class="fc-event"><div class="fc-event-inner primarybg">Evento<div></div>
									</li>
                                </ul><br>
								<b>Gráfico Semanal e Diário</b>
                                <ul>
                                    <li>
                                        Os eventos de dia todo não são exibidos no gráfico semanal ou diário.
                                    </li>
								</ul><br>
								<b>Geral</b>
                                <ul>
                                    <li>
                                        O a visualização pode ser alterada para a data atual em qualquer gráfico clicando no botão <span class="fc-button fc-button-today fc-state-default fc-corner-left fc-corner-right" unselectable="on">hoje</span>.
                                    </li>
								</ul>
                            </div>
                        </div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>
					</div>
				</div>
			</div>
		</div>
	`;

	$('body').append(modalHtml);
	$('#help-modal').modal('show');
	$('#help-modal').on('hidden.bs.modal', () => $('#help-modal').remove());
};

$('#help-button-agenda').on('click', () => openModal());