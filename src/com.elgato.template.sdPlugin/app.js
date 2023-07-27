// / <reference path="libs/js/action.js" />
// / <reference path="libs/js/stream-deck.js" />

const myAction = new Action("com.xsour.lostark.action");

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(
    ({ actionInfo, appInfo, connection, messageType, port, uuid, payload }) => {
        console.log("Stream Deck connected!");
    }
);

myAction.onWillAppear(({ context, payload }) => {
    LostArk(context, payload);
});

myAction.onKeyUp(({ context, payload }) => {
    LostArk(context, payload);
});

function LostArk(context, payload) {
    const roster = [
        [
            payload.settings.name1,
            payload.settings.name2,
            payload.settings.name3,
        ],
        [
            payload.settings.name4,
            payload.settings.name5,
            payload.settings.name6,
        ],
        [
            payload.settings.name7,
            payload.settings.name8,
            payload.settings.name9,
        ],
    ];

    const fechaActual = moment();
    const referencia = moment(payload.settings.from);
    const diasTranscurridos = Math.floor(
        (fechaActual - referencia) / (1000 * 60 * 60 * 24)
    );

    let array = [];

    for (let i = 0; diasTranscurridos >= i; i += 3) {
        array.push(roster[0]);
        array.push(roster[1]);
        array.push(roster[2]);
    }

    if (fechaActual.hours() > 6) {
        $SD.setTitle(context, array[diasTranscurridos].join("\n"));
    } else {
        $SD.setTitle(context, array[diasTranscurridos-1].join("\n"));
    }
}
