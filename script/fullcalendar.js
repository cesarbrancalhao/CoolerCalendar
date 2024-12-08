function customSource(date) {
    const filters = $('input[name="filter"]:checked')
        .map((_, el) => $(el).val()).get().join(';');

    const params = {
        date: date.$format('d/m/Y H:i:s'),
        filter: filters
    };

    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: "http://localhost:3000/events",
        data: params,
        success: res => {
            const events = res.map(ev => ({
                ...ev,
                start: new Date(ev.start),
                end: new Date(ev.end)
            }));
            
            const calendar = $('#calendar');
            calendar.fullCalendar('removeEvents');
            calendar.fullCalendar('addEventSource', events);
        },
        error: (xhr, status, error) => {
            console.error('Failed to fetch events:', error);
        }
    });
}

const modalForm = (start, end, allDay, title = '', description = '', situacao = 'A', id = '', save = true) => {
	const situacoes = {
		A: 'Agendado',
		C: 'Cancelado',
        E: 'Encerrado',
        N: 'Não confirmado',
	};

	const modalHtml = `
			<div id="event-modal" class="modal fade" >
				<div id="id-form" style="display:none">${id || ''}</div>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title">Criar Evento</h4>
						</div>
						<div class="modal-body">
							<form id="event-form">
								<div class="form-group">
									<label for="title">Título do Evento</label>
									<input type="text" class="form-control" id="title" name="title" value="${title || ''}">
								</div>
								<label for="allDay">Dia todo</label>
								<div class="form-group">
									<div class="custom-switch">
										<input type="checkbox" id="allDay" name="allDay" value="true" ${allDay ? 'checked' : ''}>
										<label class="slider" for="allDay"></label>
									</div>
								</div>
								<div class="form-group" id="date-range" ${allDay ? 'style="display:none"' : ''}>
									<div class="row">
										<div class="col-md-6">
											<label for="start">Hora do início</label>
											<input type="time" class="form-control" id="start" name="start" value="${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}">
										</div>
										<div class="col-md-6">
											<label for="end">Hora do fim</label>
											<input type="time" class="form-control" id="end" name="end" value="${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}">
										</div>
									</div>
								</div>
								<div class="form-group">
									<label for="description">Descrição do Evento</label>
									<textarea class="form-control" id="description" name="description">${description || ''}</textarea>
								</div>
								<div class="form-group">
									<label for="situacao">Situação</label>
									<select class="form-control" id="situacao" name="situacao">
										${Object.keys(situacoes).map(key => `
											<option value="${key}" ${situacao === key ? 'selected' : ''}>${situacoes[key]}</option>
										`)}
									</select>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							${save ? `
								<div class="text-right">
									<button type="button" class="hidden" style="display:none" id="delete-event">Deletar</button>
									<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>
									<button type="button" class="btn btn-primary" id="save-event">${save ? 'Salvar' : 'Editar'}</button>
								</div>
							` : `
								<div class="row">
									<div class="col-md-8 col-xs-6 text-left">
										<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>
										<button type="button" class="btn btn-primary" id="save-event">${save ? 'Salvar' : 'Editar'}</button>
									</div>
									<div class="col-md-4 col-xs-6 text-right">
										<button type="button" class="btn btn-danger" id="delete-event">Deletar</button>
									</div>
								</div>
							` }
						</div>
					</div>
				</div>
			</div>
		`;

	const validForm = (title, situacao, start, end) => title && situacao && start && end;
	const validDate = (start, end) => start.getTime() < end.getTime();

	$('body').append(modalHtml);
	$('#event-modal').modal('show');
	$('#event-modal').on('hidden.bs.modal', () => $('#event-modal').remove());
	$('#allDay').on('change', () => $('#allDay').is(':checked') ? $('#date-range').hide() : $('#date-range').show());
	$('#save-event').on('click', () => {

		const id = $('#id-form').text();
		const title = $('#title').val();
		const description = $('#description').val();
		const situacao = $('#situacao').val();
		const allDay = $('#allDay').is(':checked');

		const st =
			start.$format('Y-m-d') + " " + (allDay ? "00:00" : $('#start').val());

		const en =
			end.$format('Y-m-d') + " " + (allDay ? "23:59" : $('#end').val());

		if (!validForm(title, situacao, start, end)) {
			alert('Preencha todos os campos corretamente.');
			return;
		}

		if (!validDate(new Date(st), new Date(en))) {
            alert('O horário de inicio deve ser anterior à hora de fim.');
            return;
        }

		if (save) {
			const params = {
				title: title,
				description: description,
				situacao: situacao,
				start: st,
				end: en,
				allDay: allDay
			};
		
			$.ajax({
				dataType: 'json',
				type: 'POST',
				url: "http://localhost:3000/events",
				contentType: 'application/json',
				data: JSON.stringify(params),
				success: ev => {
					ev.start = new Date(ev.start);
					ev.end = new Date(ev.end);
					$('#calendar').fullCalendar('renderEvent', ev, true);
				}
			});
		}
		
		if (!save) {
			const params = {
				title: title,
				description: description,
				situacao: situacao,
				start: st,
				end: en,
				allDay: allDay
			};
		
			$.ajax({
				dataType: 'json',
				type: 'PUT',
				url: "http://localhost:3000/events/" + id,
				contentType: 'application/json',
				data: JSON.stringify(params),
				success: ev => {
					debugger
					ev.start = new Date(ev.start);
					ev.end = new Date(ev.end);
					$('#calendar').fullCalendar('updateEvent', ev);
				}
			});
		}

		$('#event-modal').modal('hide');
		$('#save-event').off('click');
	});
	$('#delete-event').on('click', () => {
		const id = $('#id-form').text();
		
		$('#delete-event').text('Confirmar exclusão?');
		$('#delete-event').attr('class', 'btn btn-warning pull-right');
		$('#delete-event').on('click', () => {
			$.ajax({
				dataType: 'json',
				type: 'DELETE',
				url: "http://localhost:3000/events/" + id,
				success: () => {
					$('#calendar').fullCalendar('removeEvents', id);
				},
			});

			$('#event-modal').modal('hide');
			$('#save-event').off('click');
			$('#delete-event').off('click');
		});
	});
};

$(document).ready(function () {

    $('#external-events div.external-event').each(function () {
        var eventObject = {
            title: $.trim($(this).text())
        };

        $(this).data('eventObject', eventObject);

    });

    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'title',
            center: 'agendaDay,agendaWeek,month',
            right: 'prev,next today'
        },
        editable: true,
        firstDay: 1,
        selectable: true,
        defaultView: 'month',

        axisFormat: 'h:mm',
        columnFormat: {
            month: 'ddd',
            week: 'ddd d',
            day: 'dddd M/d',
            agendaDay: 'dddd d'
        },
        titleFormat: {
            month: 'MMMM yyyy',
            week: "MMMM yyyy",
            day: 'MMMM yyyy'
        },
        allDaySlot: false,
        selectHelper: true,
        select: (start, end, allDay) => modalForm(start, end, allDay),
        droppable: false,
        drop: function (date, allDay) {

            var originalEventObject = $(this).data('eventObject');
            var copiedEventObject = $.extend({}, originalEventObject);

            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;

            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            if ($('#drop-remove').is(':checked')) $(this).remove();
        },

        events: [],
    });
});