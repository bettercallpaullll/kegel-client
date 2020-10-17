import * as alt from 'alt';
import * as native from 'natives';

var web = new alt.WebView("http://resource/assets/index.html");
var loginOpen = true;
var inputOpen = false;
var players = [];
var playerVehicles = [];

alt.onServer("test", () => {
    for (var i = 0; i < test.length; i++) {
        alt.emitServer("penis", test[i].name, test[i].hash, test[i].class, test[i].price);
    }
});

web.on('EmitServer', (eventName, ...args) => {
    alt.emitServer(eventName, ...args);
    alt.log(eventName);
})

web.on('log', (data) => {
    alt.log(data);
})

// alt.setInterval(() => {
//     if (native.isPedInMeleeCombat(alt.Player.local.scriptID)) {
//         native.setPedCombatAbility(alt.Player.local.scriptID, 0);
//         web.emit('damage:Health', "registered");
//     }
// }, 0);

//First Connect

alt.onServer('setPropertiesOnConnect', () => {
    alt.toggleGameControls(false);
    alt.setStat("stamina", 100);
    alt.setStat("strength", 100);
    alt.setStat("lung_capacity", 100);
    alt.setStat("shooting_ability", 1000);
    native.setPedSuffersCriticalHits(alt.Player.local.scriptID, false);
    native.triggerScreenblurFadeIn(5);
    showCursor();
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
    native.setEntityVisible(alt.Player.local.scriptID, false, false);
    web.focus();
    native.setPedComponentVariation(alt.Player.local.scriptID, 8, 15, 0, 0);
    native.setPedComponentVariation(alt.Player.local.scriptID, 6, 96, 3, 0);
    native.requestAnimDict('anim@heists@narcotics@funding@gang_idle');
    native.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
    native.setPlayerCanDoDriveBy(alt.Player.local, false);
    native.setPlayerWeaponDamageModifier(alt.Player.local.scriptID, 0.5);
    native.colorA(Nuttentochter)
});
//Login

alt.onServer('open:login', (n) => {
    web.emit("open:login", n);
});

alt.onServer('open:register', () => {
    web.emit("open:register");
});

alt.onServer('login:notify', (msg) => {
    web.emit("login:notify", msg);
});

alt.onServer('close:login', () => {
    web.emit('show:profile');
    web.emit('hide:login');
    native.triggerScreenblurFadeOut(1000);
    web.unfocus();
    loginOpen = false;
    web.emit('show:profile');
});


// //Chat

web.on('messageToServer', (message) => {
    alt.emitServer("chatMessageToAll", message)
});

web.on('commandToServer', (command, args) => {
    alt.emitServer("Commands", command, args)
});

alt.onServer('sendMessage', (message) => {
    web.emit('addMessage', message);
});


//teamselect

var Teams = [
    { id: 1, name: "Aztecas", count: 0 },
    { id: 2, name: "Grove Street", count: 0 },
    { id: 3, name: "Yakuza", count: 0 },
    { id: 4, name: "Ballas", count: 0 },
    { id: 5, name: "Vagos", count: 0 },
    { id: 6, name: "Bratwa", count: 0 },
    { id: 7, name: "La Cosa Nostra", count: 0 },
    { id: 8, name: "Angels Of Death MC", count: 0 }
];

var DmTeams = [
    { id: 1, name: "Hotel", count: 0 },
    { id: 2, name: "Jail", count: 0 },
    { id: 3, name: "Human Labs", count: 0 },
    { id: 4, name: "Würfelpark", count: 0 }
];;


alt.onServer('loadTeamMemeberCount', (id, count) => {
    for (var i = 0; i < Teams.length; i++) {
        if (Teams[i].id == id) {
            Teams[i].count = count;
        }
    }
});

alt.onServer('loadDmTeamMemeberCount', (id, count) => {
    for (var i = 0; i < DmTeams.length; i++) {
        if (DmTeams[i].id == id) {
            DmTeams[i].count = count;
        }
    }
});

var camera = null;

function destroyCamera() {
    native.renderScriptCams(false, false, 0, true, false);
    native.destroyCam(camera, true);
    native.destroyAllCams(true);
    camera = null;
    native.setFollowPedCamViewMode(1);
    native.clearFocus();
}

function createCamera(pos1X, pos1Y, pos1Z, rot1, fov) {
    camera = native.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", pos1X, pos1Y, pos1Z, 0, 0, rot1, fov, 0, 2, false, 0);
    native.setCamActive(camera, true);
    native.renderScriptCams(true, false, 0, false, false);
}

alt.onServer("deathscreen", (name, duration) => {
    web.emit("trigger:deathscreen", name);
    native.triggerScreenblurFadeIn(1500);
    alt.setTimeout(() => {
        web.emit("clear:deathscreen");
        native.triggerScreenblurFadeOut(500);
    }, duration);

});

alt.onServer('open:teamselect', () => {
    showCursor();
    alt.toggleGameControls(false);
    web.emit('show:teamselect', Teams, DmTeams);
    web.focus();
    createCamera(402.6, -999.5, -98.5, 0, 80);
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    native.setEntityVisible(alt.Player.local.scriptID, true, false);
    native.setEntityRotation(alt.Player.local.scriptID, 0, 0, 180, 2, true);
    web.emit('hide:chat');
    web.emit('hide:help');
    web.emit('hide:killfeed');
});

web.on('close:teamselect', () => {
    alt.toggleGameControls(true);
    web.emit('hide:teamselect');
    web.emit('show:chat');
    web.emit('show:help');
    web.emit('show:killfeed');
    web.unfocus();
    destroyCamera();
    hideCursor();
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
});

alt.onServer('beginDuellFromTeamSelect', () => {
    alt.toggleGameControls(true);
    web.emit('hide:teamselect');
    web.emit('show:chat');
    web.emit('show:help');
    web.unfocus();
    destroyCamera();
    hideCursor();
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
});

web.on('defaultTeamCloth', (id) => {
    DefaultClothes();
    alt.emitServer('defaultTeamCloth', id);
});

web.on('defaultDmCloth', () => {
    DefaultClothes();
    alt.emitServer('defaultDmCloth');
});

// // KillFeed

alt.onServer('killFeed', (name) => {
    web.emit('killFeed', name);
});

// // Profile

alt.onServer('updateProfileServer', (name, teamname, points, kills, deaths, killstreak, teamid, csscolor) => {
    web.emit('updateProfile', name, teamname, points, kills, deaths, killstreak, teamid, csscolor);
});

//ClothesSelect

web.on('clothesSelectAdd', (c, d, t) => {
    native.setPedComponentVariation(alt.Player.local.scriptID, c, d, t, 0);
})

web.on('closeClothesSelect', () => {
    web.emit('show:chat');
    web.emit('show:help');
    web.emit('show:profile');
})

alt.onServer('customClothes', () => {
    web.emit('hide:chat');
    web.emit('hide:help');
    web.emit('hide:profile');
    showCursor();
    web.focus();
    web.emit('show:clothesSelect');
});

//carshop

alt.onServer("openCarshop", () => {
    createCamera(-205, -1323, 31.5, 80, 70);
    native.setEntityVisible(alt.Player.local.scriptID, false, false);
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    web.emit("show:carshop");
    web.emit('hide:chat');
    web.emit('hide:help');
    web.emit('hide:profile');
    showCursor();
    alt.toggleGameControls(false);
    web.focus();
})

// garage

alt.onServer("loadVehicle", (name, id) => {
    playerVehicles.push({ name: name, id: id });
});

alt.onServer("openGarage", () => {
    web.emit("show:garage", playerVehicles);
    web.focus();
    showCursor();
    alt.toggleGameControls(false);
})

web.on("hide:garage", () => {
    web.unfocus();
    hideCursor();
    alt.toggleGameControls(true);
})

//server events

alt.onServer('freeze', (freeze) => {
    native.freezeEntityPosition(alt.Player.local.scriptID, freeze);
});


alt.onServer('visible', (visible) => {
    native.setEntityVisible(alt.Player.local.scriptID, visible, false);
});

alt.onServer('playerListAdd', (name) => {
    players.push(name);
    web.emit('updatePlayers', players);
});

alt.onServer('playerListRemove', (name) => {
    for (var i = 0; i < players.length; i++) {
        if (players[i] == name) {
            players.splice(i, 1);
            break;
        }
    }
    web.emit('updatePlayers', players);
});

alt.onServer("setPlayerClothes", (component, drawable, texture) => {
    native.setPedComponentVariation(alt.Player.local.scriptID, component, drawable, texture, 0);
})

alt.onServer("admin:message", (mess) => {
    web.emit("send:adminMessage", mess);
})

alt.onServer('sendNotification', (msg) => {
    displayNotification(msg);
});

alt.onServer('sendNotificationColor', (msg, color) => {
    displayAdvancedNotification(msg, color);
});

alt.onServer('setBlend', (shapeF, shapeS, skinF, skinS, blendShape, blendSkin) => {
    native.setPedHeadBlendData(alt.Player.local.scriptID, shapeF, shapeS, 0, skinF, skinS, 0, blendShape, blendSkin, 0, false);
})

alt.onServer('prop', (comp, draw, tex) => {
    native.setPedPropIndex(alt.Player.local.scriptID, comp, draw, tex, true);
})

alt.onServer('createCam', (x, y, z, rot, fov) => {
    createCamera(x, y, z, rot, fov);
})

alt.onServer('destroyCam', () => {
    destroyCamera();
})


var blips = {};

alt.onServer("setBlipBattleRoyale", (sprite, color, x, y, z, name, id) => {
    const blip = new alt.PointBlip(x, y, z)
    blip.sprite = sprite
    blip.color = color
    blip.name = name
    blips[id] = blip;
})

alt.onServer("destroyBlipBattleRoyale", (id) => {
    if (blips[id].valid) {
        blips[id].destroy();
    }
})

alt.onServer("setBlip", (sprite, color, x, y, z, name) => {
    const blip = new alt.PointBlip(x, y, z)
    blip.sprite = sprite
    blip.color = color
    blip.name = name
})

alt.onServer("teamBlip", (player, color) => {
    var blip = native.addBlipForEntity(player);
    native.setBlipSprite(blip, 9);
    native.setBlipColour(blip, color);
    native.setBlipScale(blip, 0.08);
})

alt.onServer("removeTeamBlip", (player) => {
    native.removeBlip(native.getBlipFromEntity(player.scriptID));
})

alt.onServer("setPlayerIntoVehicle", (veh) => {
    native.taskWarpPedIntoVehicle(alt.Player.local.scriptID, veh.scriptID, -1);
})

alt.onServer("spectatePlayer", (target) => {
    native.attachEntityToEntityPhysically(alt.Player.local.scriptID, target.scriptID, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false, false, 0);
    native.setEntityVisible(alt.Player.local.scriptID, false, false);
    native.setEntityInvincible(alt.Player.local.scriptID, true);
})

web.on("endBrSpec", () => {
    native.detachEntity(alt.Player.local.scriptID, true, true);
    native.setEntityVisible(alt.Player.local.scriptID, true, false);
    native.setEntityInvincible(alt.Player.local.scriptID, false);
    showCursor(false);
    alt.emitServer("endBrSpec");
})

alt.onServer("battleRoyaleSpec", (target, name, id) => {
    native.attachEntityToEntityPhysically(alt.Player.local.scriptID, target.scriptID, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false, false, 0);
    native.setEntityVisible(alt.Player.local.scriptID, false, false);
    native.setEntityInvincible(alt.Player.local.scriptID, true);
    showCursor(true);
    web.emit("brSpec", name, id);
})

alt.onServer("endSpectate", () => {
    native.detachEntity(alt.Player.local.scriptID, true, true);
    native.setEntityVisible(alt.Player.local.scriptID, true, false);
    native.setEntityInvincible(alt.Player.local.scriptID, false);
    showCursor(false);
})

// alt.onServer('damage:Armor', (damage) => {
//     web.emit('damage:Armor', damage);
// });

// alt.onServer('damage:Health', (damage) => {
//     web.emit('damage:Health', damage);
// });

alt.onServer('createDeathBlip', (x, y, z) => {
    var deathblib = new alt.PointBlip(x, y, z)
    deathblib.sprite = 429;
    deathblib.color = 1;
    deathblib.scale = 0.7;
    alt.setTimeout(() => {
        deathblib.destroy();
    }, 3000);
})

alt.onServer("spawnProtect", () => {
    native.setEntityAlpha(alt.Player.local.scriptID, 100, false);
    native.setEntityCanBeDamaged(alt.Player.local.scriptID, false);
    alt.setTimeout(() => {
        native.resetEntityAlpha(alt.Player.local.scriptID);
        native.setEntityCanBeDamaged(alt.Player.local.scriptID, true);
    }, 5000);
})

alt.onServer("enableGodMode", () => {
    native.setEntityCanBeDamaged(alt.Player.local.scriptID, false);
})

alt.onServer("disableGodMode", () => {
    native.setEntityCanBeDamaged(alt.Player.local.scriptID, true);
})

alt.onServer('createTemporaryBlip', (target, duration) => {
    if (native.doesBlipExist(native.getBlipFromEntity(target.scriptID))) {
        return;
    }
    var blip = native.addBlipForEntity(target.scriptID);
    native.setBlipSprite(blip, 397);
    native.setBlipScale(blip, 0.3);
    native.setBlipColour(blip, 1);
    alt.setTimeout(() => {
        native.removeBlip(blip);
    }, duration);
})

alt.onServer('createDuellBlip', (target) => {
    var blip = native.addBlipForEntity(target.scriptID);
    native.setBlipSprite(blip, 397);
    native.setBlipScale(blip, 0.3);
    native.setBlipColour(blip, 1);
})

alt.onServer('getGround', (x, y, id) => {
    alt.emitServer("groundZ", getGroundZ(x, y, 1), id);
})

var br_objects = {};

alt.onServer('createObj', (id, hash, x, y, z) => {
    var obj = native.createObject(hash, x, y, z, false, false, false);
    br_objects[id] = obj;
})

alt.onServer('deleteObj', (id) => {
    native.deleteEntity(br_objects[id]);
})


alt.onServer('playAnimation', (dict, name, duration) => {
    native.taskPlayAnim(
        alt.Player.local.scriptID,
        dict,
        name,
        8, //speed
        8, //playback speed multip
        duration,
        0, //flag
        0, //playback
        false, //x-lock
        false, //y-lock
        false); //z-lock
    alt.setTimeout(() => {
        native.stopAnimTask(alt.Player.local.scriptID, dict, name, 1);
    }, duration);
});

alt.onServer('createPed', (pedhash, x, y, z, heading) => {
    alt.loadModel(pedhash);
    var pedHandle = native.createPed(1, pedhash, x, y, z - 1, heading, false, false);
    native.setPedCanRagdoll(pedHandle, false);
    native.setPedDiesWhenInjured(pedHandle, false);
    native.setPedFleeAttributes(pedHandle, 0, false);
    native.setPedConfigFlag(pedHandle, 32, false);
    native.setPedConfigFlag(pedHandle, 281, true);
    native.setEntityInvincible(pedHandle, true);
    native.freezeEntityPosition(pedHandle, true);
    native.setBlockingOfNonTemporaryEvents(pedHandle, true);
    native.setPedCanBeTargetted(pedHandle, false);
});

var cursorState = 0;

function showCursor() {
    while (cursorState != 1) {
        alt.showCursor(true);
        cursorState++;
    }
}

function hideCursor() {
    while (cursorState != 0) {
        alt.showCursor(false);
        cursorState--;
    }
}

function displayNotification(text) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandThefeedPostTicker(false, true);
}

function displayAdvancedNotification(message, backgroundColor = null) {
    native.beginTextCommandThefeedPost('STRING')
    native.addTextComponentSubstringPlayerName(message)
    if (backgroundColor != null) native.thefeedSetNextPostBackgroundColor(backgroundColor)
    native.endTextCommandThefeedPostTicker(false, true)
}

// //Key Events

var helpOpen = true;

alt.on('keydown', (key) => {
    if (!loginOpen) {
        if (key == 0x54) { // T
            if (inputOpen == false) {
                web.emit('enableInput');
                web.emit('clearInput');
                alt.toggleGameControls(false);
                web.focus();
                inputOpen = true;
            }
        } else if (key == 0x0D) { // ENTER
            if (inputOpen) {
                web.emit('sendMessage');
                web.emit('disableInput');
                alt.toggleGameControls(true);
                web.unfocus();
                inputOpen = false;
            }
        } else if (key == 0x71) { //F2
            alt.emitServer("openTeamSelectAttempt");
        } else if (key == 0xBC) { //,
            alt.emitServer("health");
        } else if (key == 0xBE) { //.
            alt.emitServer("armor");
        } else if (key == 0x45) { //E
            alt.emitServer("pressedE");
        } else if (key == 0x79) { //F12
            if (helpOpen) {
                web.emit('hide:help');
                helpOpen = !helpOpen;
            } else {
                web.emit('show:help');
                helpOpen = !helpOpen;
            }
        } else if (key == 0x72) { //F3
            alt.emitServer("pressedF3");
        } else if (key == 0x73) { //F4
            alt.emitServer("pressedF4");
        }
    } else {
        if (key == 0x0D) { // ENTER
            web.emit("submitEnter");
        }
    }
});

function DefaultClothes() {
    native.setPedPropIndex(alt.Player.local.scriptID, 0, 8, 0, true);
    native.setPedPropIndex(alt.Player.local.scriptID, 1, 0, 0, true);
    native.setPedPropIndex(alt.Player.local.scriptID, 6, 2, 0, true);
}

alt.onServer('nametags:Config', handleConfig);

var renderNametags = false;
var drawDist = 50;

function handleConfig(toogle) {
    renderNametags = toogle;
    alt.setInterval(drawNametags, 0);
}

function drawNametags() {
    if (renderNametags == false) {
        return;
    }
    for (let i = 0, n = alt.Player.all.length; i < n; i++) {
        let player = alt.Player.all[i];

        if (!player.valid) {
            continue;
        }

        const name = player.getSyncedMeta('NAME');

        if (!name) {
            continue;
        }

        const pos = {...native.getPedBoneCoords(player.scriptID, 12844, 0, 0, 0) };
        pos.z += 0.75;

        let dist = distance2d(player.pos, alt.Player.local.pos);

        if (dist > drawDist) {
            continue;
        }

        let scale = 1 - (0.8 * dist) / drawDist;
        let fontSize = 0.5 * scale;

        // Names
        native.setDrawOrigin(
            pos.x,
            pos.y,
            pos.z,
            0
        );
        native.beginTextCommandDisplayText('STRING');
        native.setTextFont(4);
        native.setTextScale(fontSize, fontSize);
        native.setTextProportional(true);
        native.setTextCentre(true);
        native.setTextColour(255, 255, 255, 255);
        native.setTextOutline();
        native.addTextComponentSubstringPlayerName(name);
        native.endTextCommandDisplayText(0, 0);


        if (native.isEntityDead(player.scriptID)) {
            return;
        }

        const lineHeight = native.getTextScaleHeight(fontSize, 4);

        drawBarBackground(100, lineHeight, scale, 0.25, 158, 158, 158, 255);
        drawBar(native.getEntityHealth(player.scriptID) - 100, lineHeight, scale, 0.25, 17, 237, 127, 255);

        drawBarBackground(100, lineHeight, scale, 0.75, 158, 158, 158, 255);
        drawBar(native.getPedArmour(player.scriptID), lineHeight, scale, 0.75, 70, 158, 245, 255);

        native.clearDrawOrigin();
    }
}

function drawBar(value, lineHeight, scale, position, r, g, b, a) {
    const healthWidth = value * 0.0005 * scale;
    native.drawRect(
        (healthWidth - 100 * 0.0005 * scale) / 2,
        lineHeight + position * lineHeight,
        healthWidth,
        lineHeight / 4,
        r,
        g,
        b,
        a
    );
}

function drawBarBackground(value, lineHeight, scale, position, r, g, b, a) {
    const width = value * 0.0005 * scale;
    native.drawRect(0, lineHeight + position * lineHeight, width + 0.002, lineHeight / 3 + 0.002, 0, 0, 0, 255);
    native.drawRect(0, lineHeight + position * lineHeight, width, lineHeight / 3, r, g, b, a);
}

function distance2d(vector1, vector2) {
    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}

function getGroundZ(x, y, z, tries = 10) {
    native.setFocusPosAndVel(x, y, z, 0, 0, 0);
    let [_, height] = native.getGroundZFor3dCoord(
        x,
        y,
        z + 1000,
        undefined,
        undefined
    );
    if (!height && tries < 20) return getGroundZ(x, y, z + 100, ++tries);
    native.clearFocus();
    if (!height) return 0;
    return height;
}

const markers = {};
let markersInterval = undefined;

alt.onServer('markers:Create', markersCreate);
alt.onServer('markers:Delete', markersDelete);

function markersCreate(id, type, posX, posY, posZ, dirX, dirY, dirZ, rotX, rotY, rotZ, scaleX, scaleY, scaleZ, colorR, colorG, colorB, colorA) {
    var marker = {
        identifier: id,
        type: type,
        position: new alt.Vector3(posX, posY, posZ),
        direction: new alt.Vector3(dirX, dirY, dirZ),
        rotation: new alt.Vector3(rotX, rotY, rotZ),
        scale: new alt.Vector3(scaleX, scaleY, scaleZ),
        color: { red: colorR, green: colorG, blue: colorB, alpha: colorA }
    }
    markers[marker.identifier] = marker;

    if (!markersInterval) {
        markersInterval = alt.setInterval(drawMarkers, 0);
        alt.log(markers.length)
    }
}

function markersDelete(identifier) {
    const marker = markers[identifier];
    if (!marker) return;
    delete markers[identifier];
    if (markers.length < 1 && markersInterval) {
        alt.clearInterval(markersInterval);
        markersInterval = undefined;
    }
}


function drawMarkers() {
    for (const markerId in markers) {
        const marker = markers[markerId];
        if (!marker) continue;
        native.drawMarker(
            marker.type,
            marker.position.x,
            marker.position.y,
            marker.position.z,
            marker.direction.x,
            marker.direction.y,
            marker.direction.z,
            marker.rotation.x,
            marker.rotation.y,
            marker.rotation.z,
            marker.scale.x,
            marker.scale.y,
            marker.scale.z,
            marker.color.red,
            marker.color.green,
            marker.color.blue,
            marker.color.alpha,
            false,
            true,
            2,
            false,
            undefined,
            undefined,
            false
        );
    }
}
