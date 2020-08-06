var money = 15.00;
var blinkInv, blinkMisc;

function displayMoney() {
    $("#moneyDisplay").html("$" + money.toFixed(2));
}
var SandsOfTime = {
    minutes: 0,
    hours: 0,
    day: 1
};
var weather;
var multiplier = 0;
var season;
var array = [];
var plantId = [],
    weedId = [],
    soilId = [],
    potId = [],
    diseaseId = [];
var revenueRel = 0.00;
var messageQueue = [];

function doThisThing() {
    $(".announcementBox").last().remove();
    if ($("#plotWindow").attr("class").search("inactiveWindow") == -1) {
        $(".announcementBoxCont").css("display", "inline");
    } else {
        $(".announcementBoxCont").css("display", "none");
    }
    if (messageQueue.length > 0) {
        $(".announcementBoxCont").append("<div class='announcementBox'>" + messageQueue[0] + "</div>");
        messageQueue.shift();
    }
    var thingThis = setTimeout(function () {
        $(".announcementBox").last().remove();
        doThisThing();
    }, 1100)
}

function miniAnnounce(div) {
    messageQueue.push(div);
}

$(document).ready(doThisThing());
var firstThing;
var secondThing;

function blinkBugWeed() {
    var clearThing1 = clearTimeout(firstThing);
    var clearThing2 = clearTimeout(secondThing);
    var w, oldPlantImage;
    pestArray();
    plantArray();

    function blinkIt2() {
        firstThing = setTimeout(function () {
            for (w = 0; w < plantId.length; w = w + 1) {
                if ($(".potSquare").eq(weedId[w]).data("weed") == true && $(".potSquare").eq(weedId[w]).data("pestType") == "none") {
                    $(".potSquare").eq(weedId[w]).find(".addPot").attr("src", "weed.PNG");
                } else if ($(".potSquare").eq(sendId[w]).data("weed") == false && $(".potSquare").eq(sendId[w]).data("pestType") !== "none") {
                    $(".potSquare").eq(sendId[w]).find(".addPot").attr("src", "bug.PNG");
                } else if ($(".potSquare").eq(weedId[w]).data("weed") == true && $(".potSquare").eq(weedId[w]).data("pestType") !== "none") {
                    $(".potSquare").eq(weedId[w]).find(".addPot").attr("src", "bug.PNG");
                }
            }
        }, 1000);
        secondThing = setTimeout(function () {
            for (w = 0; w < plantId.length; w = w + 1) {
                if ($(".potSquare").eq(weedId[w]).data("weed") == true && $(".potSquare").eq(weedId[w]).data("pestType") == "none") {
                    oldPlantImage = $(".potSquare").eq(weedId[w]).data("plantType") + ".PNG";
                    $(".potSquare").eq(weedId[w]).find(".addPot").attr("src", oldPlantImage);
                } else if ($(".potSquare").eq(sendId[w]).data("weed") == false && $(".potSquare").eq(sendId[w]).data("pestType") !== "none") {
                    oldPlantImage = $(".potSquare").eq(sendId[w]).data("plantType") + ".PNG";
                    $(".potSquare").eq(sendId[w]).find(".addPot").attr("src", oldPlantImage);
                } else if ($(".potSquare").eq(weedId[w]).data("weed") == true && $(".potSquare").eq(weedId[w]).data("pestType") !== "none") {
                    $(".potSquare").eq(weedId[w]).find(".addPot").attr("src", "weed.PNG");
                }
            }
            blinkIt2();
        }, 2000);
    }
    blinkIt2();
}

function beginTime() {
    var time;
    $("#announcementAppend").append("");
    time = setInterval(function updateTime() {
        SandsOfTime.minutes = SandsOfTime.minutes + 1;
        if (SandsOfTime.minutes < 10) {
            $("#minuteDisplay").html("0" + SandsOfTime.minutes);
        } else {
            $("#minuteDisplay").html(SandsOfTime.minutes);
        }
        if (SandsOfTime.minutes > 59) {
            SandsOfTime.hours = Math.floor(SandsOfTime.minutes / 60);
            if (String(SandsOfTime.minutes % 60).length < 2) {
                $("#minuteDisplay").html("0" + (SandsOfTime.minutes % 60));
            } else {
                $("#minuteDisplay").html(SandsOfTime.minutes % 60);
            }
        }
        if (SandsOfTime.hours < 10) {
            $("#hourDisplay").html("0" + SandsOfTime.hours);
        } else {
            $("#hourDisplay").html(SandsOfTime.hours);
        }
        if (SandsOfTime.hours > 23) {
            SandsOfTime.day = SandsOfTime.day + 1;
            if (String(SandsOfTime.hours % 24).length < 2) {
                $("#hourDisplay").html("0" + (SandsOfTime.hours % 24));
            } else {
                $("#hourDisplay").html(SandsOfTime.hours % 24);
            }
        }
        $("#dayDisplay").html(Math.floor(SandsOfTime.hours / 24) + 1);
    }, 1000);
}

function blinkImage(div) {
    var currentImage = $(div).attr("src"),
        focusImage = div.slice(1, div.length - 7) + "Focus.PNG";
    $(div).attr("src", focusImage);
    setTimeout(function () {
        $(div).attr("src", currentImage);
    }, 110);
    setTimeout(function () {
        $(div).attr("src", focusImage);
    }, 220);
    setTimeout(function () {
        $(div).attr("src", currentImage);
    }, 330);
}

function blinkElement(div) {
    var currentBackground = $(div).css("background-color"),
        currentColor = $(div).css("color");
    $(div).addClass("blinkOn");
    setTimeout(function () {
        $(div).removeClass("blinkOn");
        $(div).addClass("blinkOff");
    }, 110);
    setTimeout(function () {
        $(div).removeClass("blinkOff");
        $(div).addClass("blinkOn");
    }, 220);
    setTimeout(function () {
        $(div).removeClass("blinkOn");
        $(div).addClass("blinkOff");
    }, 330);
    setTimeout(function () {
        $(div).removeClass("blinkOff");
    }, 440);
}

function blinkAlert(div) {
    var currentBackground = $(div).css("background-color"),
        currentColor = $(div).css("color");
    $(div).addClass("alertOn");
    setTimeout(function () {
        $(div).removeClass("alertOn");
        $(div).addClass("alertOff");
    }, 110);
    setTimeout(function () {
        $(div).removeClass("alertOff");
        $(div).addClass("alertOn");
    }, 220);
    setTimeout(function () {
        $(div).removeClass("alertOn");
        $(div).addClass("blinkOff");
    }, 330);
    setTimeout(function () {
        $(div).removeClass("blinkOff");
    }, 440);
}

function blinkAlertWeather(div) {
    var currentBackground = $(div).css("background-color"),
        currentColor = $(div).css("color");
    $(div).addClass("alertWeatherOn");
    setTimeout(function () {
        $(div).removeClass("alertWeatherOn");
        $(div).addClass("alertWeatherOff");
    }, 110);
    setTimeout(function () {
        $(div).removeClass("alertWeatherOff");
        $(div).addClass("alertWeatherOn");
    }, 220);
    setTimeout(function () {
        $(div).removeClass("alertWeatherOn");
        $(div).addClass("blinkOff");
    }, 330);
    setTimeout(function () {
        $(div).removeClass("blinkOff");
    }, 440);
}

function blinkAlertBackground(div) {
    var currentBackground = $(div).css("background-color"),
        currentColor = $(div).css("color");
    $(div).addClass("alertBackgroundOn");
    setTimeout(function () {
        $(div).removeClass("alertBackgroundOn");
        $(div).addClass("alertBackgroundOff");
    }, 110);
    setTimeout(function () {
        $(div).removeClass("alertBackgroundOff");
        $(div).addClass("alertBackgroundOn");
    }, 220);
    setTimeout(function () {
        $(div).removeClass("alertBackgroundOn");
        $(div).addClass("blinkOff");
    }, 330);
    setTimeout(function () {
        $(div).removeClass("blinkOff");
    }, 440);
}
$(document).ready(beginTime());
var inventory = {
    pots: 2,
    soilBags: 2,
    aloeSeeds: 2,
    tulipSeeds: 0,
    succulentSeeds: 0,
    cornSeeds: 0,
    potatoSeeds: 0,
    flytrapSeeds: 0,
    truffleSeeds: 0,
    plots: 1
};
var plot = {
    potted: 0,
    filled: 0,
    planted: 0
};
var potPrice = 5.97;
var aloePrice = 2.75,
    aloeMR = 0.10,
    tulipPrice = 4.99,
    tulipMR = 0.15,
    succulentPrice = 11.99,
    succulentMR = 0.25,
    cornPrice = 29.95,
    cornMR = 0.50,
    potatoPrice = 62.99,
    potatoMR = 0.95,
    flytrapPrice = 95.98,
    flytrapMR = 1.50,
    trufflePrice = 131.98,
    truffleMR = 2.50;
var NPK, fertType, N, P, K, photo, resp, watRet, healthCalc, healthHint, constitution, immunity, maxRevenue, revenue, bugBonus;

function calcPlantInfo(signal) {
    var nBonus, kBonus, pBonus;
    var corresNum = $("#potName").html() - 1;
    NPK = $(".potSquare").eq(corresNum).data("soilType");
    fertType = $(".potSquare").eq(corresNum).data("fertType");
    nDraft = NPK.slice(1, 3);
    pDraft = NPK.slice(5, (NPK.length - 6));
    kDraft = NPK.slice((NPK.lastIndexOf("(") + 1), (NPK.lastIndexOf(")")));
    if (fertType == "1N") {
        if (nDraft > 50) {
            nBonus = 0.95;
        } else if (nDraft < 50) {
            nBonus = 1.05;
        }
        pBonus = 1;
        kBonus = 1;
    } else if (fertType == "2N") {
        if (nDraft > 50) {
            nBonus = 0.90;
        } else if (nDraft < 50) {
            nBonus = 1.10;
        }
        pBonus = 1;
        kBonus = 1;
    } else if (fertType == "3N") {
        if (nDraft > 50) {
            nBonus = 0.85;
        } else if (nDraft < 50) {
            nBonus = 1.15;
        }
        pBonus = 1;
        kBonus = 1;
    } else if (fertType == "4N") {
        if (nDraft > 50) {
            nBonus = 0.80;
        } else if (nDraft < 50) {
            nBonus = 1.20;
        }
        pBonus = 1;
        kBonus = 1;
    } else if (fertType == "5N") {
        if (nDraft > 50) {
            nBonus = 0.75;
        } else if (nDraft < 50) {
            nBonus = 1.25;
        }
        pBonus = 1;
        kBonus = 1;
    } else if (fertType == "1P") {
        if (pDraft > 10) {
            pBonus = 0.95;
        } else if (pDraft < 10) {
            pBonus = 1.05;
        }
        nBonus = 1;
        kBonus = 1;
    } else if (fertType == "2P") {
        if (pDraft > 10) {
            pBonus = 0.90;
        } else if (pDraft < 10) {
            pBonus = 1.10;
        }
        nBonus = 1;
        kBonus = 1;
    } else if (fertType == "3P") {
        if (pDraft > 10) {
            pBonus = 0.85;
        } else if (pDraft < 10) {
            pBonus = 1.15;
        }
        nBonus = 1;
        kBonus = 1;
    } else if (fertType == "4P") {
        if (pDraft > 10) {
            pBonus = 0.80;
        } else if (pDraft < 10) {
            pBonus = 1.20;
        }
        nBonus = 1;
        kBonus = 1;
    } else if (fertType == "5P") {
        if (pDraft > 10) {
            pBonus = 0.75;
        } else if (pDraft < 10) {
            pBonus = 1.25;
        }
        nBonus = 1;
        kBonus = 1;
    } else if (fertType == "1K") {
        if (kDraft > 100) {
            kBonus = 0.95;
        } else if (kDraft < 100) {
            kBonus = 1.05;
        }
        pBonus = 1;
        nBonus = 1;
    } else if (fertType == "2K") {
        if (kDraft > 100) {
            kBonus = 0.90;
        } else if (kDraft < 100) {
            kBonus = 1.10;
        }
        pBonus = 1;
        nBonus = 1;
    } else if (fertType == "3K") {
        if (kDraft > 100) {
            kBonus = 0.85;
        } else if (kDraft < 100) {
            kBonus = 1.15;
        }
        pBonus = 1;
        nBonus = 1;
    } else if (fertType == "4K") {
        if (kDraft > 100) {
            kBonus = 0.80;
        } else if (kDraft < 100) {
            kBonus = 1.20;
        }
        pBonus = 1;
        nBonus = 1;
    } else if (fertType == "5K") {
        if (kDraft > 100) {
            kBonus = 0.75;
        } else if (kDraft < 100) {
            kBonus = 1.25;
        }
        pBonus = 1;
        nBonus = 1;
    } else if (fertType == "00") {
        nBonus = 1;
        pBonus = 1;
        kBonus = 1;
    }
    if ($(".potSquare").eq(corresNum).data("weed") === false) {
        N = Number(nDraft) * nBonus;
        P = Number(pDraft) * pBonus;
        K = Number(kDraft) * kBonus;
    }
    if ($(".potSquare").eq(corresNum).data("weed") === true) {
        photo = (((50 - Math.abs(50 - N)) / 10) + ((150 - Math.abs(150 - K)) / 30)) * 0.1;
        resp = (((10 - Math.abs(10 - P)) / 2) + ((50 - Math.abs(50 - N)) / 10)) * 0.1;
        watRet = (((10 - Math.abs(10 - P)) / 2) + ((150 - Math.abs(150 - K)) / 30)) * 0.1;
        healthCalc = (photo + resp + watRet) / 3;
    }
    if (season === "Winter") {
        photo = (((50 - Math.abs(50 - N)) / 10) + ((150 - Math.abs(150 - K)) / 30)) * 0.75;
        resp = (((10 - Math.abs(10 - P)) / 2) + ((50 - Math.abs(50 - N)) / 10)) * 0.75;
        watRet = (((10 - Math.abs(10 - P)) / 2) + ((150 - Math.abs(150 - K)) / 30)) * 0.75;
        healthCalc = (photo + resp + watRet) / 3;
    } else if (season === "Spring") {
        photo = (((50 - Math.abs(50 - N)) / 10) + ((150 - Math.abs(150 - K)) / 30)) * 1.1;
        resp = (((10 - Math.abs(10 - P)) / 2) + ((50 - Math.abs(50 - N)) / 10)) * 1.1;
        watRet = (((10 - Math.abs(10 - P)) / 2) + ((150 - Math.abs(150 - K)) / 30)) * 1.1;
        healthCalc = (photo + resp + watRet) / 3;
    } else {
        photo = ((50 - Math.abs(50 - N)) / 10) + ((150 - Math.abs(150 - K)) / 30);
        resp = ((10 - Math.abs(10 - P)) / 2) + ((50 - Math.abs(50 - N)) / 10);
        watRet = ((10 - Math.abs(10 - P)) / 2) + ((150 - Math.abs(150 - K)) / 30);
        healthCalc = (photo + resp + watRet) / 3;
    }
    var immBonus = $(".potSquare").eq(corresNum).data("immBonus")
    if (healthCalc < 5.0) {
        healthHint = "poor";
    } else if (healthCalc >= 5.0 && healthCalc < 7.5) {
        healthHint = "moderate";
    } else if (healthCalc >= 7.5 && healthCalc < 9.0) {
        healthHint = "fair";
    } else if (healthCalc >= 9.0 && healthCalc < 10.0) {
        healthHint = "excellent";
    }
    bugBonus = $(".potSquare").eq(corresNum).data("bugBonus");
    if (signal == 1) {
        constitution = 5.0 + Number(fertType.slice(0, 1));
        immunity = (healthCalc / 2);
        $(".potSquare").eq(corresNum).data("constitution", constitution);
        $(".potSquare").eq(corresNum).data("immunity", immunity);
    } else if (signal == 2) {
        immunity = (healthCalc / 2);
        $(".potSquare").eq(corresNum).data("constitution", constitution);
        $(".potSquare").eq(corresNum).data("immunity", immunity);
    }
    if ($(".potSquare").eq(corresNum).data("plantType") === "aloe") {
        maxRevenue = aloeMR;
    } else if ($(".potSquare").eq(corresNum).data("plantType") === "tulip") {
        maxRevenue = tulipMR;
    } else if ($(".potSquare").eq(corresNum).data("plantType") === "succulent") {
        maxRevenue = succulentMR;
    } else if ($(".potSquare").eq(corresNum).data("plantType") === "corn") {
        maxRevenue = cornMR;
    } else if ($(".potSquare").eq(corresNum).data("plantType") === "potato") {
        maxRevenue = potatoMR;
    } else if ($(".potSquare").eq(corresNum).data("plantType") === "flytrap") {
        maxRevenue = flytrapMR;
    } else if ($(".potSquare").eq(corresNum).data("plantType") === "truffle") {
        maxRevenue = truffleMR;
    }
    revenue = ((healthCalc / 10) * maxRevenue).toFixed(2);
    $(".potSquare").eq(corresNum).data("N", N);
    $(".potSquare").eq(corresNum).data("P", P);
    $(".potSquare").eq(corresNum).data("K", K);
    $(".potSquare").eq(corresNum).data("healthCalc", healthCalc);
    $(".potSquare").eq(corresNum).data("healthHint", healthHint);
    $(".potSquare").eq(corresNum).data("photosynthesis", photo);
    $(".potSquare").eq(corresNum).data("respiration", resp);
    $(".potSquare").eq(corresNum).data("waterRetention", watRet);
    $(".potSquare").eq(corresNum).data("revenue", revenue);
}
signal = 0;
var getMoney;

function moneyMoney() {
    var y;
    clearInterval(getMoney);
    revenue = 0;
    revenueRel = 0;
    for (y = 0; y < $('.potSquare').length; y = y + 1) {
        revenueRel = Number(Number(revenueRel) + Number($('.potSquare').eq(y).data("revenue"))).toFixed(2);
    }
    if (revenueRel != 0) {
        getMoney = setInterval(function () {
            money = money + 0.01;
            displayMoney();
        }, (1000 / (revenueRel * 100)));
    }
}
var constitutionBonus = " ";

function addFert(div) {
    var corresNum = $("#potName").html() - 1;
    var gradeThing = $(div).attr("class").slice(-2);
    $(".potSquare").eq(corresNum).data("fertType", gradeThing);
    $("#invText").find("." + gradeThing).eq(0).remove();
    calcPlantInfo(1);
    plantStats();
}

function plantStats() {
    var corresNum;
    corresNum = $("#potName").html() - 1;
    if (season === "Winter") {
        $("#potAppend").html("Generating: $" + $(".potSquare").eq(corresNum).data("revenue") + "/min<br>Health: " + $(".potSquare").eq(corresNum).data("healthHint") + "&nbsp;(-25%)<br><br>Photosynthesis: " + $(".potSquare").eq(corresNum).data("photosynthesis").toFixed(1) + "/10<br>Respiration: " + $(".potSquare").eq(corresNum).data("respiration").toFixed(1) + "/10<br>Water Retention: " + $(".potSquare").eq(corresNum).data("waterRetention").toFixed(1) + "/10<br><br>Constitution: +" + $(".potSquare").eq(corresNum).data("constitution").toFixed(1) + "/10<br>Immunity: +" + $(".potSquare").eq(corresNum).data("immunity").toFixed(1) + "/10 " + constitutionBonus + "<br><span id='removeWeed' onclick='removeWeed()'></span>" + "<span id='removePest' onclick='removePest()'></span>" + "<span id='removePlant' onclick='removePlant()'></span>" + "<span id='addFert'></span>");
    } else if (season === "Spring") {
        $("#potAppend").html("Generating: $" + $(".potSquare").eq(corresNum).data("revenue") + "/min<br>Health: " + $(".potSquare").eq(corresNum).data("healthHint") + "&nbsp;(+10%)<br><br>Photosynthesis: " + $(".potSquare").eq(corresNum).data("photosynthesis").toFixed(1) + "/10<br>Respiration: " + $(".potSquare").eq(corresNum).data("respiration").toFixed(1) + "/10<br>Water Retention: " + $(".potSquare").eq(corresNum).data("waterRetention").toFixed(1) + "/10<br><br>Constitution: +" + $(".potSquare").eq(corresNum).data("constitution").toFixed(1) + "/10<br>Immunity: +" + $(".potSquare").eq(corresNum).data("immunity").toFixed(1) + "/10 " + constitutionBonus + "<br><span id='removeWeed' onclick='removeWeed()'></span>" + "<span id='removePest' onclick='removePest()'></span>" + "<span id='removePlant' onclick='removePlant()'></span>" + "<span id='addFert'></span>");
    } else {
        $("#potAppend").html("Generating: $" + $(".potSquare").eq(corresNum).data("revenue") + "/min<br>Health: " + $(".potSquare").eq(corresNum).data("healthHint") + "<br><br>Photosynthesis: " + $(".potSquare").eq(corresNum).data("photosynthesis").toFixed(1) + "/10<br>Respiration: " + $(".potSquare").eq(corresNum).data("respiration").toFixed(1) + "/10<br>Water Retention: " + $(".potSquare").eq(corresNum).data("waterRetention").toFixed(1) + "/10<br><br>Constitution: +" + $(".potSquare").eq(corresNum).data("constitution").toFixed(1) + "/10<br>Immunity: +" + $(".potSquare").eq(corresNum).data("immunity").toFixed(1) + "/10 " + constitutionBonus + "<br><span id='removeWeed' onclick='removeWeed()'></span>" + "<span id='removePest' onclick='removePest()'></span>" + "<span id='removePlant' onclick='removePlant()'></span>" + "<span id='addFert'></span>");
    }
    if ($(".potSquare").eq(corresNum).data("weed") == true) {
        $("#removeWeed").html("<br>&gt; Remove weed &lt;");
    }
    if ($(".potSquare").eq(corresNum).data("diseaseType") !== "none") {
        $("#removePlant").html("<br>&gt; Remove plant &lt;");
    }
    if ($(".invFertilizer").length > 0 && $(".potSquare").eq(corresNum).data("fertType") == "00") {
        for (var w = 0; w < $(".invFertilizer").length; w = w + 1) {
            var gradeName = $(".invFertilizer").eq(w).attr("class").slice(-2);
            var fillText = $(".invFertilizer").eq(w).text().slice(11);
            $("#addFert").before("<br><span class='addFertButton " + gradeName + "' onclick='addFert(this)'>&gt; Fertilize " + fillText + " &lt;</span>");
        }
    }
    if ($(".potSquare").eq(corresNum).data("pestType") !== "none") {
        var pestThing = $(".potSquare").eq(corresNum).data("pestType");
        $("#removePest").html("<br>&gt; Remove " + pestThing.toLowerCase() + " &lt;");
    }
}

function weed() {
    var worldTime, corresNum, rand, available, randId;
    corresNum = $("#potName").html() - 1;
    rand = Math.floor(Math.random() * plantId.length);
    available = plantId.slice(0);
    randId = available[rand];
    if ($(".potSquare").eq(randId).data("weed") === false) {
        $(".potSquare").eq(randId).data("weed", true);
        //$(".potSquare").eq(randId).find(".addPot").attr("src", "weed.PNG");
        moneyMoney();
        NPK = $(".potSquare").eq(randId).data("soilType");
        fertType = $(".potSquare").eq(randId).data("fertType");
        if ($(".potSquare").eq(randId).data("weed") === false) {
            N = NPK.slice(1, 3);
            P = NPK.slice(5, (NPK.length - 6));
            K = NPK.slice((NPK.lastIndexOf("(") + 1), (NPK.lastIndexOf(")")));
        }
        if ($(".potSquare").eq(randId).data("weed") === true) {
            N = Number(NPK.slice(1, 3)) * 0.1;
            P = Number(NPK.slice(5, (NPK.length - 6))) * 0.1;
            K = Number(NPK.slice((NPK.lastIndexOf("(") + 1), (NPK.lastIndexOf(")")))) * 0.1;
        }
        photo = ((50 - Math.abs(50 - N)) / 10) + ((150 - Math.abs(150 - K)) / 30);
        resp = ((10 - Math.abs(10 - P)) / 2) + ((50 - Math.abs(50 - N)) / 10);
        watRet = ((10 - Math.abs(10 - P)) / 2) + ((150 - Math.abs(150 - K)) / 30);
        healthCalc = (photo + resp + watRet) / 3;
        if (healthCalc < 5.0) {
            healthHint = "poor";
        } else if (healthCalc >= 5.0 && healthCalc < 7.5) {
            healthHint = "moderate";
        } else if (healthCalc >= 7.5 && healthCalc < 9.0) {
            healthHint = "fair";
        } else if (healthCalc >= 9.0 && healthCalc < 10.0) {
            healthHint = "excellent";
        }
        if (season == "Winter") {
            photo = (((50 - Math.abs(50 - N)) / 10) + ((150 - Math.abs(150 - K)) / 30)) * 0.75;
            resp = (((10 - Math.abs(10 - P)) / 2) + ((50 - Math.abs(50 - N)) / 10)) * 0.75;
            watRet = (((10 - Math.abs(10 - P)) / 2) + ((150 - Math.abs(150 - K)) / 30)) * 0.75;
            healthCalc = (photo + resp + watRet) / 3;
        } else if (season == "Spring") {
            photo = (((50 - Math.abs(50 - N)) / 10) + ((150 - Math.abs(150 - K)) / 30)) * 1.1;
            resp = (((10 - Math.abs(10 - P)) / 2) + ((50 - Math.abs(50 - N)) / 10)) * 1.1;
            watRet = (((10 - Math.abs(10 - P)) / 2) + ((150 - Math.abs(150 - K)) / 30)) * 1.1;
            healthCalc = (photo + resp + watRet) / 3;
        } else {
            photo = ((50 - Math.abs(50 - N)) / 10) + ((150 - Math.abs(150 - K)) / 30);
            resp = ((10 - Math.abs(10 - P)) / 2) + ((50 - Math.abs(50 - N)) / 10);
            watRet = ((10 - Math.abs(10 - P)) / 2) + ((150 - Math.abs(150 - K)) / 30);
            healthCalc = (photo + resp + watRet) / 3;
        }
        immunity = (healthCalc / 2);
        if ($(".potSquare").eq(randId).data("plantType") === "aloe") {
            maxRevenue = aloeMR;
        } else if ($(".potSquare").eq(randId).data("plantType") === "tulip") {
            maxRevenue = tulipMR;
        } else if ($(".potSquare").eq(randId).data("plantType") === "succulent") {
            maxRevenue = succulentMR;
        } else if ($(".potSquare").eq(randId).data("plantType") === "corn") {
            maxRevenue = cornMR;
        } else if ($(".potSquare").eq(randId).data("plantType") === "potato") {
            maxRevenue = potatoMR;
        } else if ($(".potSquare").eq(randId).data("plantType") === "flytrap") {
            maxRevenue = flytrapMR;
        } else if ($(".potSquare").eq(randId).data("plantType") === "truffle") {
            maxRevenue = truffleMR;
        }
        revenue = ((healthCalc / 10) * maxRevenue).toFixed(2);
        var bugBonus = $(".potSquare").eq(randId).data("bugBonus");
        $(".potSquare").eq(randId).data("N", N);
        $(".potSquare").eq(randId).data("P", P);
        $(".potSquare").eq(randId).data("K", K);
        $(".potSquare").eq(randId).data("healthCalc", healthCalc);
        $(".potSquare").eq(randId).data("healthHint", healthHint);
        $(".potSquare").eq(randId).data("photosynthesis", photo);
        $(".potSquare").eq(randId).data("respiration", resp);
        $(".potSquare").eq(randId).data("waterRetention", watRet);
        $(".potSquare").eq(randId).data("immunity", immunity);
        $(".potSquare").eq(randId).data("revenue", revenue);
        if (corresNum === randId) {
            plantStats();
            $("#removeWeed").html("<br>&gt; Remove weed &lt;");
        }
        //calcPlantInfo();
        plantArray();
        blinkBugWeed(randId);
        moneyMoney();
        blinkAlert("#announcementButton");
        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='bolded'>A weed has sprouted in Pot " + (Number(randId) + 1) + "!</span></span><br>");
        var messageVar = "A weed has sprouted in Pot " + (Number(randId) + 1) + "!";
        miniAnnounce(messageVar);
    } else if (available.length !== 0 && $(".potSquare").eq(randId).data("weed") === true) {
        weed();
    }
}

function plantArray(div) {
    var thing, thing2, thing3, thing4, y, y2, y3, y4, string, string2, string3, string4, condition;
    thing = $(':data(plantType)');
    thing2 = $(':data(potted)');
    thing3 = $(':data(soilType)');
    thing4 = $(':data(plantType)');
    array.length = 0;
    plantId.length = 0;
    weedId.length = 0;
    potId.length = 0;
    soilId.length = 0;
    revenue = 0;
    revenueRel = 0;
    moneyMoney();
    for (y = 0; y < thing.length; y = y + 1) {
        string = thing.eq(y).data("plantType");
        if (string !== "none") {
            array.push(string);
            plantId.push(y);
        }
    }
    for (y2 = 0; y2 < thing2.length; y2 = y2 + 1) {
        string2 = thing2.eq(y2).data("potted");
        if (string2 != false) {
            potId.push(y2);
        }
    }
    for (y3 = 0; y3 < thing3.length; y3 = y3 + 1) {
        string3 = thing3.eq(y3).data("soilType");
        if (string3 !== "none") {
            soilId.push(y3);
        }
    }
    for (y4 = 0; y4 < thing4.length; y4 = y4 + 1) {
        string4 = thing4.eq(y4).data("weed");
        if (string4 === true) {
            weedId.push(y4);
        }
    }
    condition = div;
    if (condition === 1) {
        weed();
    }
}
var send = [];
var sendId = [];

function pestArray(div) {
    var thing, y, string, condition;
    thing = $(':data(pestType)');
    send.length = 0;
    sendId.length = 0;
    revenue = 0;
    revenueRel = 0;
    moneyMoney();
    for (y = 0; y < thing.length; y = y + 1) {
        string = thing.eq(y).data("pestType");
        if (string != "none") {
            send.push(string);
            sendId.push(y);
        }
    }
    condition = div;
    if (condition == 1) {
        weed();
    }
}

function updateInvSoil() {
    var i, a, n;
    for (n = 1; n < $(".invSoil").length; n = n + 1) {
        $(".invSoil").removeClass("invSoil" + n);
    }
    for (i = 0; i < $(".invSoil").length; i = i + 1) {
        a = $(".invSoil").eq(i);
        a.addClass("invSoil" + (i + 1));
    }
}

function updateInvPots() {
    var i, a;
    for (i = 0; i < $(".invPot").length; i = i + 1) {
        a = $(".invPot").eq(i);
        a.addClass("invPot" + (i + 1));
    }
}

function updateInvSeeds() {
    var i, a, n;
    for (n = 1; n < $(".invSeeds").length + 2; n = n + 1) {
        $(".invSeeds").removeClass("invSeeds" + n);
    }
    for (i = 0; i < $(".invSeeds").length; i = i + 1) {
        a = $(".invSeeds").eq(i);
        a.addClass("invSeeds" + (i + 1));
    }
}
var f = -1;
var ff = -1;
var killInt;
var potThing;
var pestThing;

function pestSpread() {
    var operation = [
        -1,
        1,
        4,
        -4
    ];
    var operationPick = potThing + operation[Math.floor(Math.random() * 4)];
    var worldTime;
    var testThing = $(".potSquare").eq(operationPick).data("plantType");
    if ($(".potSquare").eq(operationPick).data("pestType") == "none" && testThing !== "none" && typeof testThing !== 'undefined') {
        ff = ff + 1;
        blinkAlert("#announcementButton");
        $(".potSquare").eq(operationPick).data("pestType", pestThing);
        pestArray();
        pest();
        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='bolded'>" + pestThing + " have spread to pot " + (operationPick + 1) + "!</span></span><br>");
        var messageVar = pestThing + " have spread to pot " + (operationPick + 1) + "!";
        miniAnnounce(messageVar);
    } else {
        pestSpread();
    }
}

function pest() {
    var bugBonus, w;
    bugBonus = 0.1;
    plantArray();
    pestArray();

    function thisThing() {
        var clear = clearTimeout(killInt);
        killInt = setTimeout(function () {
            for (w = 0; w < sendId.length; w = w + 1) {
                plantArray();
                pestArray();
                var corresNum = $("#potName").html();
                if ($(".potSquare").eq(sendId[w]).data("constitution") < 0.1) {
                    plantArray();
                    pestArray();
                    $(".potSquare").eq(sendId[w]).data("constitution", 0.0);
                    var sendPest = $(".potSquare").eq(sendId[w]).data("pestType");
                    potThing = sendId[w];
                    pestThing = sendPest;
                    revertPlant(sendId[w]);
                    plantArray();
                    pestArray();
                    pestSpread();
                    plantArray();
                    pestArray();
                } else {
                    $(".potSquare").eq(sendId[w]).data("bugBonus", bugBonus);
                    $(".potSquare").eq(sendId[w]).data("constitution", $(".potSquare").eq(sendId[w]).data("constitution") - $(".potSquare").eq(sendId[w]).data("bugBonus"));
                }
                if (corresNum == (sendId[w] + 1)) {
                    plantStats();
                }
                thisThing();
            }
        }, 1000);
    }
    thisThing();
}

var r = -1;
var rr = -1;
var killInt2;
var potThing2;
var diseaseThing;

function diseaseSpread() {
    var operation2 = [
        -1,
        1,
        4,
        -4,
        -5,
        -3,
        3,
        5
    ];
    var operationPick2 = potThing2 + operation2[Math.floor(Math.random() * 8)];
    var worldTime;
    var testThing2 = $(".potSquare").eq(operationPick2).data("plantType");
    if ($(".potSquare").eq(operationPick2).data("diseaseType") == "none" && testThing2 !== "none" && typeof testThing2 !== 'undefined') {
        rr = rr + 1;
        blinkAlert("#announcementButton");
        $(".potSquare").eq(operationPick2).data("diseaseType", diseaseThing);
        diseaseArray();
        disease();
        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='bolded'>" + diseaseThing.slice(0, 1).toUpperCase() + diseaseThing.slice(1) + " has spread to pot " + (operationPick2 + 1) + "!</span></span><br>");
        var messageVar = diseaseThing.slice(0, 1).toUpperCase() + diseaseThing.slice(1) + " has spread to pot " + (operationPick2 + 1) + "!";
        miniAnnounce(messageVar);
    } else {
        diseaseSpread();
    }
}

function diseaseArray() {
    var thing, y, string;
    thing = $(':data(diseaseType)');
    diseaseId.length = 0;
    revenue = 0;
    revenueRel = 0;
    moneyMoney();
    for (y = 0; y < thing.length; y = y + 1) {
        string = thing.eq(y).data("diseaseType");
        if (string != "none") {
            diseaseId.push(y);
        }
    }
}

function disease() {
    var w;
    plantArray();
    diseaseArray();

    function thisThing4() {
        var clear = clearTimeout(killInt2);
        killInt2 = setTimeout(function () {
            for (w = 0; w < diseaseId.length; w = w + 1) {
                plantArray();
                diseaseArray();
                var corresNum = $("#potName").html();
                if ($(".potSquare").eq(diseaseId[w]).data("immunity") < 0.1) {
                    plantArray();
                    diseaseArray();
                    $(".potSquare").eq(diseaseId[w]).data("immunity", 0.0);
                    var sendDisease = $(".potSquare").eq(diseaseId[w]).data("diseaseType");
                    potThing2 = diseaseId[w];
                    diseaseThing = sendDisease;
                    revertPlant(diseaseId[w]);
                    plantArray();
                    diseaseArray();
                    diseaseSpread();
                    plantArray();
                    diseaseArray();
                } else {
                    $(".potSquare").eq(diseaseId[w]).data("immBonus", 0.1);
                    $(".potSquare").eq(diseaseId[w]).data("immunity", $(".potSquare").eq(diseaseId[w]).data("immunity") - $(".potSquare").eq(diseaseId[w]).data("immBonus"));
                }
                if (corresNum == (diseaseId[w] + 1)) {
                    plantStats();
                }
                thisThing4();
            }
        }, 1000);
    }
    thisThing4();
}

function diseaseInit() {
    plantArray();
    diseaseArray();
    var diseaseList = [
        "leaf spots",
        "mildew",
        "root rot",
        "a fungus"
    ];
    var potRand = Math.floor(Math.random() * plantId.length);
    var potChoice = plantId[potRand];
    var diseaseRand = Math.floor(Math.random() * diseaseList.length);
    var diseaseChoice = diseaseList[diseaseRand];
    var randTime = Math.floor(Math.random() * 150000) + 90000;
    var delay = setTimeout(function () {
        plantArray();
        diseaseArray();
        if ($(".potSquare").eq(potChoice).data("diseaseType") == "none" && $(".potSquare").eq(potChoice).data("plantType") != "none") {
            blinkAlert("#announcementButton");
            $(".potSquare").eq(potChoice).data("diseaseType", diseaseChoice);
            worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
            $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='bolded'>Pot" + (potChoice + 1) + " is stricken with " + diseaseChoice + "!</span></span><br>");
            disease(potChoice);
            var messageVar = "Pot " + (potChoice + 1) + " is stricken with " + diseaseChoice + "!";
            miniAnnounce(messageVar);
            plantArray();
            diseaseArray();
        } else {
            diseaseInit();
        }
        plantArray();
        diseaseArray();
    }, randTime);
}

function pestInit() {
    plantArray();
    pestArray();
    var randTime, delay, pestRand, potRand, pestList, pestChoice, potChoice, worldTime, killInt, bugBonus, corresNum;
    pestList = [
        "Beetles",
        "Moths",
        "Larvae",
        "Aphids",
        "Snails",
        "Slugs",
        "Crickets",
        "Flies",
        "Mites"
    ];
    pestRand = Math.floor(Math.random() * pestList.length);
    potRand = Math.floor(Math.random() * plantId.length);
    pestChoice = pestList[pestRand];
    potChoice = plantId[potRand];
    randTime = Math.floor(Math.random() * 90000) + 90000;
    //randTime = Math.floor(Math.random() * 0) + 5000;
    f = f + 1;
    delay = setTimeout(function () {
        plantArray();
        pestArray();
        if ($(".potSquare").eq(potChoice).data("pestType") == "none" && $(".potSquare").eq(potChoice).data("plantType") != "none") {
            blinkAlert("#announcementButton");
            $(".potSquare").eq(potChoice).data("pestType", pestChoice);
            worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
            $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='bolded'>" + pestChoice + " have infested pot " + (potChoice + 1) + "!</span></span><br>");
            blinkBugWeed(potChoice);
            pest(potChoice);
            var messageVar = pestChoice + " have infested pot " + (potChoice + 1) + "!";
            miniAnnounce(messageVar);
            plantArray();
            pestArray();
        } else {
            pestInit();
        }
        plantArray();
        pestArray();
    }, randTime);
}
$(document).ready(updateInvSoil());
$(document).ready(updateInvSeeds());
$(document).ready(updateInvPots());

function potIsFull() {
    var corresNum, i, thing;
    corresNum = $("#potName").html() - 1;
    $("#potAppend").html("Soil: " + $(".potSquare").eq(corresNum).data("soilType") + "<br><br>");
    updateInvSoil();
    if ($(".potSquare").eq(corresNum).data("plantType") == "none" && $(".invSeeds").length > 0) {
        for (i = 1; i < $(".invSeeds").length + 1; i = i + 1) {
            thing = $(".invSeeds").eq(i - 1).text();
            $("#potAppend").append("<span class='plantType plantType" + i + "' onclick='plantSeed(this)'>> Plant " + thing.slice(0, (thing.length - 5)).toLowerCase() + " <<br></span>");
        }
    } else if ($(".potSquare").eq(corresNum).data("plantType") == "none" && $(".invSeeds").length === 0) {
        $("#potAppend").append("no seeds available");
    }
}

var timeThing;

function weedInit() {
    var timeDiff;
    clearTimeout(timeThing);
    timeDiff = Math.floor(Math.random().toFixed(1) * 19000) + (Math.random().toFixed(1) * 19000) + 12;
    timeThing = setInterval(function () {
        plantArray(1);
        weedInit();
    }, timeDiff);
}
$(document).ready(function () {
    var i;
    for (i = 0; i < 32; i = i + 1) {
        $(".plot").append("<div class='potSquare' tabindex = '-1' onfocus = focusTest(this) onblur = blurTest(this)><img class='potContent addPot' src='IMG_0179.PNG'/></div>");
        $(".potSquare:last").data("potted", false);
        $(".potSquare:last").data("soilType", "none");
        $(".potSquare:last").data("fertType", "00");
        $(".potSquare:last").data("plantType", "none");
        $(".potSquare:last").data("N", "none");
        $(".potSquare:last").data("P", "none");
        $(".potSquare:last").data("K", "none");
        $(".potSquare:last").data("photosynthesis", 0);
        $(".potSquare:last").data("respiration", 0);
        $(".potSquare:last").data("waterRetention", 0);
        $(".potSquare:last").data("immunity", 0);
        $(".potSquare:last").data("constitution", "none");
        $(".potSquare:last").data("revenue", 0.00);
        $(".potSquare:last").data("weed", false);
        $(".potSquare:last").data("pestType", "none");
        $(".potSquare:last").data("diseaseType", "none");
        $(".potSquare:last").data("bugBonus", 0);
        $(".potSquare:last").data("immBonus", 0);
        $(".potSquare").click(function () {
            $("#invText").addClass("inactiveWindow");
            $("#plotText").addClass("inactiveWindow");
            $("#plotInfoText").addClass("inactiveWindow");
            $("#invTab").removeClass("activeTab");
            $("#plotsTab").removeClass("activeTab");
            $("#infoTab").removeClass("activeTab");
            $("#potText").removeClass("inactiveWindow");
            $("#potName").html($(this).index() + 1);
            $(this).focus();
            if ($(this).data("potted") === false && inventory.pots > 0) {
                $("#potAppend").html("<p class='potPlace potPlace" + $(this).index() + "' onclick = placePot(this)> > Place pot here <</p>");
            } else if ($(this).data("potted") === false && inventory.pots === 0) {
                $("#potAppend").html("no pots available");
            } else if ($(this).data("potted") === true && $(this).data("soilType") === "none" && inventory.soilBags !== 0) {
                updateInvSoil();
                $("#potAppend").html("Soil: none" + "<br><br>Fill with:<br>");
                var h, thing;
                for (h = 1; h < $(".invSoil").length + 1; h = h + 1) {
                    thing = $(".invSoil" + h).text();
                    $("#potAppend").append("<span class='soilType soilType" + h + "' onclick='fillPot(this)'>> " + thing.slice(7) + " <<br></span>");
                }
            } else if ($(this).data("potted") === true && $(this).data("soilType") === "none" && inventory.soilBags === 0) {
                updateInvSoil();
                $("#potAppend").html("Soil: none" + "<br>");
            } else if ($(this).data("potted") === true && $(this).data("soilType") !== "none" && $(this).data("plantType") === "none") {
                updateInvSoil();
                potIsFull();
            } else if ($(this).data("potted") === true && $(this).data("soilType") !== "none" && $(this).data("plantType") !== "none" && $(this).data("weed") === false) {
                plantStats();
            } else if ($(this).data("potted") === true && $(this).data("soilType") !== "none" && $(this).data("plantType") !== "none" && $(this).data("weed") === true) {
                plantStats();
                $("#removeWeed").html("<br>&gt; Remove weed &lt;");
            }
        });
    }
});
$("#shopPots").click(function () {
    if (money >= potPrice) {
        blinkImage("#potShopImg");
        inventory.pots = inventory.pots + 1;
        money = money - potPrice;
        displayMoney();
        blinkElement("#moneyDisplay");
        blinkElement("#invTab");
        $(".invItem:first").before("<span class='invItem invPot'>Clay Pot<br></span>");
    } else {
        blinkElement("#potPriceDisplay");
    }
});

function placePot(div) {
    var corresNum, i, thing;
    inventory.pots = inventory.pots - 1;
    plot.potted = plot.potted + 1;
    $(".invPot").eq(0).remove();
    corresNum = $("#potName").html() - 1;
    $(".potSquare").eq(corresNum).find(".addPot").attr("src", "pot.PNG");
    $(".potSquare").eq(corresNum).data("potted", true);
    plantArray();
    $(".potCount").html(potId.length);
    if (inventory.soilBags !== 0 && $(".potSquare").eq(corresNum).data("soilType") === "none") {
        $("#potAppend").html("Soil: none" + "<br><br>Fill with:<br>");
        for (i = 1; i < $(".invSoil").length + 1; i = i + 1) {
            thing = $(".invSoil").eq(i - 1).text();
            $("#potAppend").append("<span class='soilType soilType" + i + "' onclick='fillPot(this)'>> " + thing.slice(7) + " <<br></span>");
        }
        updateInvSoil();
    } else if (inventory.soilBags !== 0 && $(".potSquare").eq(corresNum).data("soilType") !== "none" && $(".potSquare").eq(corresNum).data("plantType") === "none") {
        updateInvSoil();
        potIsFull();
    } else if (inventory.soilBags === 0 && $(".potSquare").eq(corresNum).data("soilType") === "none") {
        $("#potAppend").html("Soil: none<br>");
    }
    $(".potSquare").eq(corresNum).focus();
}

function focusTest(div) {
    if ($(div).find(".addPot").attr('src') === "pot.PNG") {
        $(div).find(".addPot").attr('src', "potFocus.PNG");
    } else if ($(div).find(".addPot").attr('src') === "IMG_0179.PNG") {
        $(div).find(".addPot").attr('src', "IMG_0205.PNG");
    } else if ($(div).find(".addPot").attr('src') === "aloe.PNG") {
        $(div).find(".addPot").attr('src', "aloeFocus.PNG");
    } else if ($(div).find(".addPot").attr('src') === "tulip.PNG") {
        $(div).find(".addPot").attr('src', "tulipFocus.PNG");
    } else if ($(div).find(".addPot").attr('src') === "succulent.PNG") {
        $(div).find(".addPot").attr('src', "succulentFocus.PNG");
    } else if ($(div).find(".addPot").attr('src') === "corn.PNG") {
        $(div).find(".addPot").attr('src', "cornFocus.PNG");
    } else if ($(div).find(".addPot").attr('src') === "potato.PNG") {
        $(div).find(".addPot").attr('src', "potatoFocus.PNG");
    } else if ($(div).find(".addPot").attr('src') === "flytrap.PNG") {
        $(div).find(".addPot").attr('src', "flytrapFocus.PNG");
    } else if ($(div).find(".addPot").attr('src') === "truffle.PNG") {
        $(div).find(".addPot").attr('src', "truffleFocus.PNG");
    } else if ($(div).find(".addPot").attr('src') === "weed.PNG") {
        $(div).find(".addPot").attr('src', "weedFocus.PNG");
    }
}

function blurTest(div) {
    if ($(div).find(".addPot").attr('src') === "potFocus.PNG") {
        $(div).find(".addPot").attr('src', "pot.PNG");
    } else if ($(div).find(".addPot").attr('src') === "IMG_0205.PNG") {
        $(div).find(".addPot").attr('src', "IMG_0179.PNG");
    } else if ($(div).find(".addPot").attr('src') === "aloeFocus.PNG") {
        $(div).find(".addPot").attr('src', "aloe.PNG");
    } else if ($(div).find(".addPot").attr('src') === "tulipFocus.PNG") {
        $(div).find(".addPot").attr('src', "tulip.PNG");
    } else if ($(div).find(".addPot").attr('src') === "succulentFocus.PNG") {
        $(div).find(".addPot").attr('src', "succulent.PNG");
    } else if ($(div).find(".addPot").attr('src') === "cornFocus.PNG") {
        $(div).find(".addPot").attr('src', "corn.PNG");
    } else if ($(div).find(".addPot").attr('src') === "potatoFocus.PNG") {
        $(div).find(".addPot").attr('src', "potato.PNG");
    } else if ($(div).find(".addPot").attr('src') === "flytrapFocus.PNG") {
        $(div).find(".addPot").attr('src', "flytrap.PNG");
    } else if ($(div).find(".addPot").attr('src') === "truffleFocus.PNG") {
        $(div).find(".addPot").attr('src', "truffle.PNG");
    } else if ($(div).find(".addPot").attr('src') === "weedFocus.PNG") {
        $(div).find(".addPot").attr('src', "weed.PNG");
    }
}
$("#plotsTab").click(function () {
    $("#invText").addClass("inactiveWindow");
    $("#plotText").removeClass("inactiveWindow");
    $("#plotInfoText").addClass("inactiveWindow");
    $("#potText").addClass("inactiveWindow");
    $("#invTab").removeClass("activeTab");
    $("#plotsTab").addClass("activeTab");
    $("#infoTab").removeClass("activeTab");
});
$("#infoTab").click(function () {
    $("#invText").addClass("inactiveWindow");
    $("#plotText").addClass("inactiveWindow");
    $("#plotInfoText").removeClass("inactiveWindow");
    $("#potText").addClass("inactiveWindow");
    $("#invTab").removeClass("activeTab");
    $("#plotsTab").removeClass("activeTab");
    $("#infoTab").addClass("activeTab");
});
$("#invTab").click(function () {
    var clearIt = clearInterval(blinkInv);
    $("#invText").removeClass("inactiveWindow");
    $("#plotText").addClass("inactiveWindow");
    $("#plotInfoText").addClass("inactiveWindow");
    $("#potText").addClass("inactiveWindow");
    $("#invTab").addClass("activeTab");
    $("#plotsTab").removeClass("activeTab");
    $("#infoTab").removeClass("activeTab");
});

function fillPot(div) {
    var corresNum, NPK, classNum, n;
    corresNum = $("#potName").html() - 1;
    NPK = div.innerHTML.substring(10, div.innerHTML.length - 9);
    $(".potSquare").eq(corresNum).data("soilType", NPK);
    classNum = div.className.slice(17);
    $(".invSoil" + classNum).remove();
    div.remove();
    inventory.soilBags = inventory.soilBags - 1;
    plot.filled = plot.filled + 1;
    plantArray();
    $(".soilCount").html(soilId.length);
    $(".potSquare").eq(corresNum).focus();
    updateInvSoil();
    potIsFull();
}
$("#shopPlotsTab").click(function () {
    $("#shopPots").addClass("inactiveWindow");
    $("#shopPlots").removeClass("inactiveWindow");
    $("#shopFill").addClass("inactiveWindow");
    $("#shopSeeds").addClass("inactiveWindow");
    $("#shopPotsTab").removeClass("activeTab");
    $("#shopFillTab").removeClass("activeTab");
    $("#shopPlotsTab").addClass("activeTab");
    $("#shopSeedsTab").removeClass("activeTab");
});
$("#shopPotsTab").click(function () {
    $("#shopPots").removeClass("inactiveWindow");
    $("#shopPlots").addClass("inactiveWindow");
    $("#shopFill").addClass("inactiveWindow");
    $("#shopSeeds").addClass("inactiveWindow");
    $("#shopPotsTab").addClass("activeTab");
    $("#shopFillTab").removeClass("activeTab");
    $("#shopPlotsTab").removeClass("activeTab");
    $("#shopSeedsTab").removeClass("activeTab");
});
$("#shopFillTab").click(function () {
    $("#shopPots").addClass("inactiveWindow");
    $("#shopPlots").addClass("inactiveWindow");
    $("#shopFill").removeClass("inactiveWindow");
    $("#shopSeeds").addClass("inactiveWindow");
    $("#shopPotsTab").removeClass("activeTab");
    $("#shopFillTab").addClass("activeTab");
    $("#shopPlotsTab").removeClass("activeTab");
    $("#shopSeedsTab").removeClass("activeTab");
});
$("#shopSeedsTab").click(function () {
    $("#shopPots").addClass("inactiveWindow");
    $("#shopPlots").addClass("inactiveWindow");
    $("#shopFill").addClass("inactiveWindow");
    $("#shopSeeds").removeClass("inactiveWindow");
    $("#shopPotsTab").removeClass("activeTab");
    $("#shopFillTab").removeClass("activeTab");
    $("#shopPlotsTab").removeClass("activeTab");
    $("#shopSeedsTab").addClass("activeTab");
});

function plantSeed(div) {
    var corresNum, plantType, classNum, n;
    corresNum = $("#potName").html() - 1;
    plantType = div.innerHTML.substring(11, div.innerHTML.length - 15).toLowerCase();
    $(".potSquare").eq(corresNum).data("plantType", plantType);
    if (plantType === "aloe") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "aloe.PNG");
    } else if (plantType === "tulip") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "tulip.PNG");
    } else if (plantType === "succulent") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "succulent.PNG");
    } else if (plantType === "corn") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "corn.PNG");
    } else if (plantType === "potato") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "potato.PNG");
    } else if (plantType === "flytrap") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "flytrap.PNG");
    } else if (plantType === "truffle") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "truffle.PNG");
    }
    div.remove();
    classNum = div.className.slice(19);
    $(".invSeeds" + classNum).remove();
    for (n = 1; n < $(".invSeeds").length + 2; n = n + 1) {
        $(".invSeeds").removeClass("invSeeds" + n);
    }
    $(".potSquare").eq(corresNum).focus();
    updateInvSeeds();
    plot.planted = plot.planted + 1;
    plantArray();
    $(".plantCount").html(plantId.length);
    weedInit();
    pestInit();
    diseaseInit();
    revenue = 0;
    revenueRel = 0;
    calcPlantInfo(1);
    plantStats();
    moneyMoney();
}
$("#potText").mousedown(function () {
    var corresNum = $("#potName").html() - 1;
    $(".potSquare").eq(corresNum).focus();
});
$("#gardenButton").click(function () {
    $("#plotWindow").removeClass("inactiveWindow");
    $("#announcementWindow").addClass("inactiveWindow");
    $("#miscWindow").addClass("inactiveWindow");
    $(".announcementBox").removeClass("inactiveWindow");
    $("#gardenButton").addClass("activeTab");
    $("#announcementButton").removeClass("activeTab");
    $("#miscButton").removeClass("activeTab");
    $("#survivalGuide").css("display", "none");
    $("#glossary").css("display", "none");
});
$("#announcementButton").click(function () {
    $("#plotWindow").addClass("inactiveWindow");
    $("#announcementWindow").removeClass("inactiveWindow");
    $("#miscWindow").addClass("inactiveWindow");
    $("#gardenButton").removeClass("activeTab");
    $("#announcementButton").addClass("activeTab");
    $("#miscButton").removeClass("activeTab");
    $("#survivalGuide").css("display", "none");
    $("#glossary").css("display", "none");
    $(".announcementBox").addClass("inactiveWindow");
});
$("#miscButton").click(function () {
    var clearIt = clearInterval(blinkMisc);
    $(".announcementBox").addClass("inactiveWindow");
    $("#plotWindow").addClass("inactiveWindow");
    $("#announcementWindow").addClass("inactiveWindow");
    $("#miscWindow").removeClass("inactiveWindow");
    $("#gardenButton").removeClass("activeTab");
    $("#announcementButton").removeClass("activeTab");
    $("#miscButton").addClass("activeTab");
    $("#survivalGuide").css("display", "none");
    $("#glossary").css("display", "none");
});
var z = 0;
var lastEvent = "none";
$(document).ready(function backgroundUpdate() {
    var backgroundEvents, eventSelect, timeDiff;
    backgroundEvents = [
        "A rabbit rustles in the bush",
        "A rodent rustles in the bush",
        "A creature rustles in the bush",
        "The sun reflects off glass",
        "A bird rustles in the bush",
        "A racoon rustles in the bush",
        "A bird soars in the wind",
        "A dog yawns lazily",
        "A willow sways lazily",
        "A bee lands on a flower",
        "A bird takes flight",
        "A swan takes flight",
        "A ladybug takes flight",
        "Windchimes can be heard",
        "Clouds dance in the sky",
        "A bird plays in a puddle",
        "A hummingbird smells a flower",
        "A squirrel plays in a puddle",
        "A squirrel smells the roses",
        "A lizard basks in the sun",
        "A squirrel finds an acorn",
        "A dog plays in a puddle",
        "A worm digs through the earth",
        "A bee smells the roses",
        "A bee falls in love",
        "A ladybug falls in love",
        "Leaves flutter in the wind",
        "A garter snake smells the air",
        "A garter snake basks in the sun",
        "Baby birds stir in slumber",
        "A rodent scurries away",
        "A mouse scurries away",
        "A mouse stirs in slumber",
        "A willow sways in the breeze",
        "An oak sways in the breeze"
    ];
    eventSelect = backgroundEvents[Math.floor(Math.random() * backgroundEvents.length)];
    timeDiff = Math.floor(Math.random().toFixed(1) * 20000) + 9000;
    setTimeout(function () {
        if (eventSelect !== lastEvent) {
            blinkAlertBackground("#announcementButton");
            z = z + 1;
            $(".announcementFirst").remove();
            var worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
            $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + " " + eventSelect + "</span><br>");
            var messageVar = eventSelect;
            miniAnnounce(messageVar);
            lastEvent = eventSelect.slice(0);
            backgroundUpdate();
        } else {
            backgroundUpdate();
        }
    }, timeDiff);
});
$("#closeWarning").click(function () {
    $("#readmeWarning").remove();
});
$("#openPatchNotes").click(function () {
    $("#patchNotes").css("display", "inline");
});
$("#closePatchNotes").click(function () {
    $("#patchNotes").css("display", "none");
});
var fertPrice = [
    5.99,
    9.99,
    17.49,
    25.99,
    39.97
];

function buyFert(div) {
    var elementId = $(div).attr("id"),
        grade = elementId.slice(4, 5),
        bonus = elementId.slice(5, 6);
    if (money >= fertPrice[grade - 1]) {
        $("#fertilizer" + grade + "MR").html("&nbsp;&nbsp;&nbsp;<span class='" + grade + bonus + "confirmFert fertNPK' onclick='confirmFert(this)'>Confirm</span>&nbsp;&nbsp;&nbsp;<span class='" + grade + "cancelFert fertNPK' onclick='cancelFert(this)'>Cancel</span>");
    } else {
        blinkElement("#fert" + grade + "Price");
    }
}
$("#openSurvivalGuide").click(function () {
    $("#survivalGuide").css("display", "inline");
});
$("#openGlossary").click(function () {
    $("#glossary").css("display", "inline");
});
$("#closeSurvivalGuide").click(function () {
    $("#survivalGuide").css("display", "none");
});
$("#closeGlossary").click(function () {
    $("#glossary").css("display", "none");
});

function confirmFert(div) {
    var elementId = $(div).attr("class"),
        grade = elementId.slice(0, 1),
        bonus = elementId.slice(1, 2);
    money = money - fertPrice[grade - 1];
    displayMoney();
    blinkElement("#moneyDisplay");
    blinkElement("#invTab");
    switch (grade) {
        case "1":
            $(".invItem:first").before("<span class='invItem invFertilizer 1" + bonus + "'>Fertilizer Grade I: " + bonus + "</span><br>");
            $("#fertilizer" + grade + "MR").html('Bonus (+5%): <span id="fert1N" class="fertNPK" onclick="buyFert(this)">±N</span>&nbsp;<span id="fert1P" class="fertNPK" onclick="buyFert(this)">±P</span>&nbsp;<span id="fert1K" class="fertNPK" onclick="buyFert(this)">±K</span>');
            break;
        case "2":
            $(".invItem:first").before("<span class='invItem invFertilizer 2" + bonus + "'>Fertilizer Grade II: " + bonus + "</span><br>");
            $("#fertilizer" + grade + "MR").html('Bonus (+10%): <span id="fert2N" class="fertNPK" onclick="buyFert(this)">±N</span>&nbsp;<span id="fert2P" class="fertNPK" onclick="buyFert(this)">±P</span>&nbsp;<span id="fert2K" class="fertNPK" onclick="buyFert(this)">±K</span>');
            break;
        case "3":
            $(".invItem:first").before("<span class='invItem invFertilizer 3" + bonus + "'>Fertilizer Grade III: " + bonus + "</span><br>");
            $("#fertilizer" + grade + "MR").html('Bonus (+15%): <span id="fert3N" class="fertNPK" onclick="buyFert(this)">±N</span>&nbsp;<span id="fert3P" class="fertNPK" onclick="buyFert(this)">±P</span>&nbsp;<span id="fert3K" class="fertNPK" onclick="buyFert(this)">±K</span>');
            break;
        case "4":
            $(".invItem:first").before("<span class='invItem invFertilizer 4" + bonus + "'>Fertilizer Grade IV: " + bonus + "</span><br>");
            $("#fertilizer" + grade + "MR").html('Bonus (+20%): <span id="fert4N" class="fertNPK" onclick="buyFert(this)">±N</span>&nbsp;<span id="fert4P" class="fertNPK" onclick="buyFert(this)">±P</span>&nbsp;<span id="fert4K" class="fertNPK" onclick="buyFert(this)">±K</span>');
            break;
        case "5":
            $(".invItem:first").before("<span class='invItem invFertilizer 5" + bonus + "'>Fertilizer Grade V: " + bonus + "</span><br>");
            $("#fertilizer" + grade + "MR").html('Bonus (+25%): <span id="fert5N" class="fertNPK" onclick="buyFert(this)">±N</span>&nbsp;<span id="fert5P" class="fertNPK" onclick="buyFert(this)">±P</span>&nbsp;<span id="fert5K" class="fertNPK" onclick="buyFert(this)">±K</span>');
            break;
    }
    if ($("#potText").attr("class").search("inactiveWindow") == -1) {
        plantStats();
    }
}

function cancelFert(div) {
    var elementId = $(div).attr("class"),
        grade = elementId.slice(0, 1);
    switch (grade) {
        case "1":
            $("#fertilizer" + grade + "MR").html('Bonus (+5%): <span id="fert1N" class="fertNPK" onclick="buyFert(this)">±N</span>&nbsp;<span id="fert1P" class="fertNPK" onclick="buyFert(this)">±P</span>&nbsp;<span id="fert1K" class="fertNPK" onclick="buyFert(this)">±K</span>');
            break;
        case "2":
            $("#fertilizer" + grade + "MR").html('Bonus (+10%): <span id="fert2N" class="fertNPK" onclick="buyFert(this)">±N</span>&nbsp;<span id="fert2P" class="fertNPK" onclick="buyFert(this)">±P</span>&nbsp;<span id="fert2K" class="fertNPK" onclick="buyFert(this)">±K</span>');
            break;
        case "3":
            $("#fertilizer" + grade + "MR").html('Bonus (+15%): <span id="fert3N" class="fertNPK" onclick="buyFert(this)">±N</span>&nbsp;<span id="fert3P" class="fertNPK" onclick="buyFert(this)">±P</span>&nbsp;<span id="fert3K" class="fertNPK" onclick="buyFert(this)">±K</span>');
            break;
        case "4":
            $("#fertilizer" + grade + "MR").html('Bonus (+20%): <span id="fert4N" class="fertNPK" onclick="buyFert(this)">±N</span>&nbsp;<span id="fert4P" class="fertNPK" onclick="buyFert(this)">±P</span>&nbsp;<span id="fert4K" class="fertNPK" onclick="buyFert(this)">±K</span>');
            break;
        case "5":
            $("#fertilizer" + grade + "MR").html('Bonus (+25%): <span id="fert5N" class="fertNPK" onclick="buyFert(this)">±N</span>&nbsp;<span id="fert5P" class="fertNPK" onclick="buyFert(this)">±P</span>&nbsp;<span id="fert5K" class="fertNPK" onclick="buyFert(this)">±K</span>');
            break;
    }
}
$(document).ready(displayMoney());
$("#aloeShop").click(function () {
    if (money >= aloePrice) {
        blinkElement("#moneyDisplay");
        blinkElement("#invTab");
        blinkImage("#aloeShopImg");
        money = money - aloePrice;
        displayMoney();
        inventory.aloeSeeds = inventory.aloeSeeds + 1;
        $(".invItem").eq(0).before("<span class='invItem invSeeds invAloe'>Aloe Seeds (x1)<br></span>");
        updateInvSeeds();
    } else {
        blinkElement("#aloePriceDisplay");
    }
});
$("#tulipShop").click(function () {
    if (money >= tulipPrice) {
        blinkElement("#moneyDisplay");
        blinkElement("#invTab");
        blinkImage("#tulipShopImg");
        money = money - tulipPrice;
        displayMoney();
        inventory.tulipSeeds = inventory.tulipSeeds + 1;
        $(".invItem").eq(0).before("<span class='invItem invSeeds invTulip'>Tulip Seeds (x1)<br></span>");
        updateInvSeeds();
    } else {
        blinkElement("#tulipPriceDisplay");
    }
});
$("#succulentShop").click(function () {
    if (money >= succulentPrice) {
        blinkElement("#moneyDisplay");
        blinkElement("#invTab");
        blinkImage("#succulentShopImg");
        money = money - succulentPrice;
        displayMoney();
        inventory.succulentSeeds = inventory.succulentSeeds + 1;
        $(".invItem").eq(0).before("<span class='invItem invSeeds invSucculent'>Succulent Seeds (x1)<br></span>");
        updateInvSeeds();
    } else {
        blinkElement("#succulentPriceDisplay");
    }
});
$("#cornShop").click(function () {
    if (money >= cornPrice) {
        blinkElement("#moneyDisplay");
        blinkElement("#invTab");
        blinkImage("#cornShopImg");
        money = money - cornPrice;
        displayMoney();
        inventory.cornSeeds = inventory.cornSeeds + 1;
        $(".invItem").eq(0).before("<span class='invItem invSeeds invCorn'>Corn Seeds (x1)<br></span>");
        updateInvSeeds();
    } else {
        blinkElement("#cornPriceDisplay");
    }
});
$("#potatoShop").click(function () {
    if (money >= potatoPrice) {
        blinkElement("#moneyDisplay");
        blinkElement("#invTab");
        blinkImage("#potatoShopImg");
        money = money - potatoPrice;
        displayMoney();
        inventory.potatoSeeds = inventory.potatoSeeds + 1;
        $(".invItem").eq(0).before("<span class='invItem invSeeds invPotato'>Potato Seeds (x1)<br></span>");
        updateInvSeeds();
    } else {
        blinkElement("#potatoPriceDisplay");
    }
});
$("#flytrapShop").click(function () {
    if (money >= flytrapPrice) {
        blinkElement("#moneyDisplay");
        blinkElement("#invTab");
        blinkImage("#flytrapShopImg");
        money = money - flytrapPrice;
        displayMoney();
        inventory.flytrapSeeds = inventory.flytrapSeeds + 1;
        $(".invItem").eq(0).before("<span class='invItem invSeeds invFlytrap'>Flytrap Seeds (x1)<br></span>");
        updateInvSeeds();
    } else {
        blinkElement("#flytrapPriceDisplay");
    }
});
$("#truffleShop").click(function () {
    if (money >= trufflePrice) {
        blinkElement("#moneyDisplay");
        blinkElement("#invTab");
        blinkImage("#truffleShopImg");
        money = money - trufflePrice;
        displayMoney();
        inventory.truffleSeeds = inventory.truffleSeeds + 1;
        $(".invItem").eq(0).before("<span class='invItem invSeeds invTruffle'>Truffle Seeds (x1)<br></span>");
        updateInvSeeds();
    } else {
        blinkElement("#trufflePriceDisplay");
    }
});
var soil1Price = 3.99,
    soil2Price = 16.38,
    soil3Price = 36.95;
$("#soil1Shop").click(function () {
    if (money >= soil1Price) {
        blinkElement("#invTab");
        blinkElement("#moneyDisplay");
        money = money - soil1Price;
        displayMoney();
        inventory.soilBags = inventory.soilBags + 1;
        var soilN = Math.floor(Math.random() * (50 * 0.5 * 2)) + (50 * 0.5),
            soilP = Math.floor(Math.random() * (10 * 0.5 * 2)) + (10 * 0.5),
            soilK = Math.floor(Math.random() * (150 * 0.5 * 2)) + (150 * 0.5);
        var soilNPK = "(" + soilN + ")" + "(" + soilP + ")" + "(" + soilK + ")";
        var soilInv = "<span class='invItem invSoil'>Bag of Soil " + soilNPK + "<br></span>";
        updateInvSoil();
        $(".invItem:first").before(soilInv);
    } else {
        blinkElement("#soil1PriceDisplay")
    }
});
$("#soil2Shop").click(function () {
    if (money >= soil2Price) {
        blinkElement("#invTab");
        blinkElement("#moneyDisplay");
        money = money - soil2Price;
        displayMoney();
        inventory.soilBags = inventory.soilBags + 1;
        var soilN = Math.floor(Math.random() * (50 * 0.3 * 2)) + (50 * 0.7),
            soilP = Math.floor(Math.random() * (10 * 0.3 * 2)) + (10 * 0.7),
            soilK = Math.floor(Math.random() * (150 * 0.3 * 2)) + (150 * 0.7);
        var soilNPK = "(" + soilN + ")" + "(" + soilP + ")" + "(" + soilK + ")";
        var soilInv = "<span class='invItem invSoil'>Bag of Soil " + soilNPK + "<br></span>";
        updateInvSoil();
        $(".invItem:first").before(soilInv);
    } else {
        blinkElement("#soil2PriceDisplay")
    }
});
$("#soil3Shop").click(function () {
    if (money >= soil3Price) {
        blinkElement("#invTab");
        blinkElement("#moneyDisplay");
        money = money - soil3Price;
        displayMoney();
        inventory.soilBags = inventory.soilBags + 1;
        var soilN = Math.floor(Math.random() * (50 * 0.1 * 2)) + (50 * 0.9),
            soilP = Math.floor(Math.random() * (10 * 0.1 * 2)) + (10 * 0.9),
            soilK = Math.floor(Math.random() * (150 * 0.1 * 2)) + (150 * 0.9);
        var soilNPK = "(" + soilN + ")" + "(" + soilP + ")" + "(" + soilK + ")";
        var soilInv = "<span class='invItem invSoil'>Bag of Soil " + soilNPK + "<br></span>";
        updateInvSoil();
        $(".invItem:first").before(soilInv);
    } else {
        blinkElement("#soil3PriceDisplay")
    }
});

function plotSelection(div) {
    $(".plotSelect").removeClass("activeTab");
    $(div).addClass("activeTab");
    $(".plotWrap").addClass("inactiveWindow");
    var corresNum = $(div).text().slice(5);
    $(".plotWrap").eq(corresNum - 1).removeClass("inactiveWindow");
    blinkElement(".plotNum");
}
var w = 0;
$("#shopPlots").click(function () {
    if (money >= 300.00) {
        w = w + 1;
        inventory.plots = inventory.plots + 1;
        blinkElement("#plotsTab");
        blinkElement("#moneyDisplay");
        money = money - 300.00;
        displayMoney();
        $('<div class="plotWrap inactiveWindow style="margin-bottom:-100px;"><div id="plotWindow" style="margin-left: 3px; margin-bottom:-100px;"><div id="plotNameText"><span class="plotNum">Plot ' + (w + 1) + '</span></div><div style="margin-bottom:-100px;" class="plot' + (w + 1) + '"></div></div></div>').appendTo("#plotWindow");
        for (var i = 0; i < 32; i = i + 1) {
            $(".plot" + (w + 1)).append("<div class='potSquare' tabindex = '-1' onfocus = focusTest(this) onblur = blurTest(this)><img class='potContent addPot' src='IMG_0179.PNG'/></div>");
            $(".potSquare:last").data("potted", false);
            $(".potSquare:last").data("soilType", "none");
            $(".potSquare:last").data("fertType", "00");
            $(".potSquare:last").data("plantType", "none");
            $(".potSquare:last").data("N", "none");
            $(".potSquare:last").data("P", "none");
            $(".potSquare:last").data("K", "none");
            $(".potSquare:last").data("photosynthesis", 0);
            $(".potSquare:last").data("respiration", 0);
            $(".potSquare:last").data("waterRetention", 0);
            $(".potSquare:last").data("immunity", 0);
            $(".potSquare:last").data("constitution", "none");
            $(".potSquare:last").data("revenue", 0);
            $(".potSquare:last").data("weed", false);
            $(".potSquare:last").data("pestType", "none");
            $(".potSquare:last").data("diseaseType", "none");
            $(".potSquare:last").data("bugBonus", 0);
            $(".potSquare:last").data("immBonus", 0);
            $(".plot" + (w + 1)).find(".potSquare").click(function () {
                $("#invText").addClass("inactiveWindow");
                $("#plotText").addClass("inactiveWindow");
                $("#plotInfoText").addClass("inactiveWindow");
                $("#invTab").removeClass("activeTab");
                $("#plotsTab").removeClass("activeTab");
                $("#infoTab").removeClass("activeTab");
                $("#potText").removeClass("inactiveWindow");
                $("#potName").html(($(this).index() + 1) + (($(this).parent().attr("class").slice(4) - 1) * 32));
                if ($(this).data("potted") === false && inventory.pots > 0) {
                    $("#potAppend").html("<p class='potPlace potPlace" + $(this).index() + "' onclick = placePot(this)> > Place pot here <</p>");
                } else if ($(this).data("potted") === false && inventory.pots === 0) {
                    $("#potAppend").html("no pots available");
                } else if ($(this).data("potted") === true && $(this).data("soilType") === "none" && inventory.soilBags !== 0) {
                    updateInvSoil();
                    $("#potAppend").html("Soil: none" + "<br><br>Fill with:<br>");
                    var h, thing;
                    for (h = 1; h < $(".invSoil").length + 1; h = h + 1) {
                        thing = $(".invSoil" + h).text();
                        $("#potAppend").append("<span class='soilType soilType" + h + "' onclick='fillPot(this)'>> " + thing.slice(7) + " <<br></span>");
                    }
                } else if ($(this).data("potted") === true && $(this).data("soilType") === "none" && inventory.soilBags === 0) {
                    updateInvSoil();
                    $("#potAppend").html("Soil: none" + "<br>");
                } else if ($(this).data("potted") === true && $(this).data("soilType") !== "none" && $(this).data("plantType") === "none") {
                    updateInvSoil();
                    potIsFull();
                } else if ($(this).data("potted") === true && $(this).data("soilType") !== "none" && $(this).data("plantType") !== "none" && $(this).data("weed") === false) {
                    calcPlantInfo();
                    plantStats();
                } else if ($(this).data("potted") === true && $(this).data("soilType") !== "none" && $(this).data("plantType") !== "none" && $(this).data("weed") === true) {
                    calcPlantInfo();
                    plantStats();
                    $("#removeWeed").html("<br>&gt; Remove weed &lt;");
                }
            });
        }
        $(".plotSelect:last").after("<span class='plotSelect' onclick='plotSelection(this)'>Plot " + (w + 1) + "<br></span>");
    } else {
        blinkElement("#plotPriceInsert");
    }
    plantArray(1);
    $(".slotCount").html((w + 1) * 32);
});

function removeWeed(div) {
    weedInit();
    var corresNum = $("#potName").html() - 1;
    $(".potSquare").eq(corresNum).data("weed", false);
    plantArray();
    pestArray();
    blinkBugWeed();
    var plantType = $(".potSquare").eq(corresNum).data("plantType");
    calcPlantInfo(2);
    moneyMoney();
    plantStats();
    if (plantType === "aloe") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "aloe.PNG");
    } else if (plantType === "tulip") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "tulip.PNG");
    } else if (plantType === "succulent") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "succulent.PNG");
    } else if (plantType === "corn") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "corn.PNG");
    } else if (plantType === "potato") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "potato.PNG");
    } else if (plantType === "flytrap") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "flytrap.PNG");
    } else if (plantType === "truffle") {
        $(".potSquare").eq(corresNum).find(".potContent").attr("src", "truffle.PNG");
    }
    $(".potSquare").eq(corresNum).focus();
}

function revertPlant(div) {
    var corresNum = $("#potName").html() - 1;
    $(':data(plantType)').eq(div).find(".addPot").attr("src", "IMG_0179.PNG");
    $(':data(plantType)').eq(div).data("potted", false);
    $(':data(plantType)').eq(div).data("soilType", "none");
    $(':data(plantType)').eq(div).data("fertType", "00");
    $(':data(plantType)').eq(div).data("plantType", "none");
    $(':data(plantType)').eq(div).data("N", 0);
    $(':data(plantType)').eq(div).data("P", 0);
    $(':data(plantType)').eq(div).data("K", 0);
    $(':data(plantType)').eq(div).data("photosynthesis", 0);
    $(':data(plantType)').eq(div).data("respiration", 0);
    $(':data(plantType)').eq(div).data("waterRetention", 0);
    $(':data(plantType)').eq(div).data("immunity", 0);
    $(':data(plantType)').eq(div).data("constitution", "none");
    $(':data(plantType)').eq(div).data("revenue", 0);
    $(':data(plantType)').eq(div).data("weed", false);
    $(':data(plantType)').eq(div).data("pestType", "none");
    $(':data(plantType)').eq(div).data("diseaseType", "none");
    $(':data(plantType)').eq(div).data("bugBonus", 0);
    $(':data(plantType)').eq(div).data("immBonus", 0);
    plot.filled = plot.filled - 1;
    plot.potted = plot.potted - 1;
    pestArray();
    //calcPlantInfo();
    //moneyMoney();
    if (corresNum == div) {
        if ($(".potSquare").eq(corresNum).data("potted") === false && inventory.pots > 0) {
            $("#potAppend").html("<p class='potPlace potPlace" + $(".potSquare").eq(corresNum).index() + "' onclick = placePot(this)> > Place pot here <</p>");
        } else if ($(".potSquare").eq(corresNum).data("potted") === false && inventory.pots === 0) {
            $("#potAppend").html("no pots available");
        }
    }
}

function revertLine(div) {
    var corresNum = $("#potName").html() - 1;
    $(".potSquare").eq(div).find(".addPot").attr("src", "IMG_0179.PNG");
    $(".potSquare").eq(div).data("potted", false);
    $(".potSquare").eq(div).data("soilType", "none");
    $(".potSquare").eq(div).data("fertType", "00");
    $(".potSquare").eq(div).data("plantType", "none");
    $(".potSquare").eq(div).data("N", "none");
    $(".potSquare").eq(div).data("P", "none");
    $(".potSquare").eq(div).data("K", "none");
    $(".potSquare").eq(div).data("photosynthesis", 0);
    $(".potSquare").eq(div).data("respiration", 0);
    $(".potSquare").eq(div).data("waterRetention", 0);
    $(".potSquare").eq(div).data("immunity", 0);
    $(".potSquare").eq(div).data("constitution", "none");
    $(".potSquare").eq(div).data("revenue", 0);
    $(".potSquare").eq(div).data("weed", false);
    $(".potSquare").eq(div).data("pestType", "none");
    $(".potSquare").eq(div).data("diseaseType", "none");
    $(".potSquare").eq(div).data("bugBonus", 0);
    $(".potSquare").eq(div).data("immBonus", 0);
    plot.filled = plot.filled - 1;
    plot.potted = plot.potted - 1;
    //pestArray();
    //plantArray();
    //calcPlantInfo();
    //moneyMoney();
    if (corresNum == div) {
        if ($(".potSquare").eq(corresNum).data("potted") === false && inventory.pots > 0) {
            $("#potAppend").html("<p class='potPlace potPlace" + $(".potSquare").eq(corresNum).index() + "' onclick = placePot(this)> > Place pot here <</p>");
        } else if ($(".potSquare").eq(corresNum).data("potted") === false && inventory.pots === 0) {
            $("#potAppend").html("no pots available");
        }
    }
}
var timeThing2;
var lastWeather = "none";

function weatherFunc() {
    var timeDiff, weatherList, eventThing, eventSelect, worldTime, winterWeather, springWeather, summerWeather, autumnWeather;
    weather = "none";
    winterWeather = [
        "A blizzard",
        "A snow storm",
        "A deep freeze",
        "Freezing rain",
        "A cyclone"
    ];
    springWeather = [
        "A twister",
        "A light shower",
        "Heavy rain",
        "A thunderstorm"
    ];
    summerWeather = [
        "A twister",
        "A light shower",
        "Heavy rain",
        "A monsoon",
        "A hurricane"
    ];
    autumnWeather = [
        "A cyclone",
        "A rain storm",
        "A thunderstorm",
        "Heavy winds"
    ];
    if (season == "Winter") {
        eventThing = Math.floor(Math.random() * 5);
        eventSelect = winterWeather[eventThing];
    } else if (season == "Spring") {
        eventThing = Math.floor(Math.random() * 4);
        eventSelect = springWeather[eventThing];
    } else if (season == "Summer") {
        eventThing = Math.floor(Math.random() * 5);
        eventSelect = summerWeather[eventThing];
    } else if (season == "Autumn") {
        eventThing = Math.floor(Math.random() * 4);
        eventSelect = autumnWeather[eventThing];
    }
    weather = eventSelect;
    clearTimeout(timeThing2);
    if (weather !== lastWeather) {
        timeDiff = Math.floor(Math.random().toFixed(1) * 10000) + (Math.random().toFixed(1) * 5000) + 32000;
        timeThing2 = setTimeout(function () {
            if (weather == "A snow storm") {
                constitutionBonus = "(-25%)";
                var w;
                for (w = 0; w < $(".potSquare").length; w = w + 1) {
                    $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("healthCalc") / 2))
                    $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("immunity") * 0.75));
                }
                var corresNum = $("#potName").html() - 1;
                if (corresNum == w) {
                    plantStats();
                }
            } else if (weather == "Freezing rain") {
                constitutionBonus = "(-50%)";
                for (w = 0; w < $(".potSquare").length; w = w + 1) {
                    $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("healthCalc") / 2))
                    $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("immunity") * 0.50));
                }
                var corresNum = $("#potName").html() - 1;
                if (corresNum == w) {
                    plantStats();
                }
            } else if (weather == "A light shower") {
                constitutionBonus = "(+12%)";
                for (w = 0; w < $(".potSquare").length; w = w + 1) {
                    $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("healthCalc") / 2))
                    $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("immunity") * 1.12));
                }
                var corresNum = $("#potName").html() - 1;
                if (corresNum == w) {
                    plantStats();
                }
            } else if (weather == "Heavy rain") {
                constitutionBonus = "(+25%)";
                for (w = 0; w < $(".potSquare").length; w = w + 1) {
                    $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("healthCalc") / 2))
                    $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("immunity") * 1.25));
                }
                var corresNum = $("#potName").html() - 1;
                if (corresNum == w) {
                    plantStats();
                }
            } else if (weather == "A monsoon") {
                constitutionBonus = "(-75%)";
                for (w = 0; w < $(".potSquare").length; w = w + 1) {
                    $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("healthCalc") / 2))
                    $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("immunity") * 0.25));
                }
                var corresNum = $("#potName").html() - 1;
                if (corresNum == w) {
                    plantStats();
                }
            } else if (weather == "A rain storm") {
                constitutionBonus = "(+15%)";
                for (w = 0; w < $(".potSquare").length; w = w + 1) {
                    $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("healthCalc") / 2))
                    $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("immunity") * 1.15));
                }
                var corresNum = $("#potName").html() - 1;
                if (corresNum == w) {
                    plantStats();
                }
            } else {
                constitutionBonus = " ";
                var corresNum = $("#potName").html() - 1;
                if (corresNum == w) {
                    plantStats();
                }
            }
            blinkAlertWeather("#announcementButton");
            if (weather == "Heavy winds") {
                worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + weather + " have struck!</span></span><br>");
                var messageVar = weather + " have struck!";
                miniAnnounce(messageVar);
            } else {
                worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + weather + " has struck!</span></span><br>");
                var messageVar = weather + " has struck!";
                miniAnnounce(messageVar);
            }
            var resultEvent = setTimeout(function () {
                var amountToKill, killRange, oneOrTwo, w, plantEq, endWeather, weatherDuration;
                killRange = (Math.random() * 0.1) + 0.1;
                oneOrTwo = Math.floor(Math.random() * 2) + 1;
                weatherDuration = (Math.floor(Math.random() * 15) + 30) * 1000;
                if (weather == "A blizzard") {
                    if (oneOrTwo == 1) {
                        amountToKill = Math.round((array.length * 0.3) + killRange);
                    } else {
                        amountToKill = Math.round((array.length * 0.3) - killRange);
                    }
                    if (amountToKill > 1) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The snow has buried " + amountToKill + " plants!</span></span><br>");
                        var messageVar = "The snow has buried " + amountToKill + " plants!";
                        miniAnnounce(messageVar);
                        plantArray();
                        moneyMoney();
                        lastWeather = weather;
                        weatherFunc();
                    } else if (amountToKill == 1) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The snow has buried " + amountToKill + " plant!</span></span><br>");
                        var messageVar = "The snow has buried " + amountToKill + " plant!";
                        miniAnnounce(messageVar);
                        pestArray();
                        plantArray();
                        moneyMoney();
                        lastWeather = weather;
                        weatherFunc();
                    } else if (amountToKill == 0) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>Your garden has been spared.</span></span><br>");
                        var messageVar = "Your garden has been spared.";
                        miniAnnounce(messageVar);
                        lastWeather = weather;
                        weatherFunc();
                    }
                    for (w = 0; w < amountToKill; w = w + 1) {
                        var doThis = setTimeout(function () {
                            plantEq = plantId[Math.floor(Math.random() * array.length)];
                            revertPlant(plantEq);
                            pestArray();
                            plantArray();
                        }, 250);
                    }
                } else if (weather == "A snow storm") {
                    worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                    $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The snow storm will last " + (weatherDuration / 1000) + "min.</span></span><br>");
                    var messageVar = "The snow storm will last " + (weatherDuration / 1000) + "min.";
                    miniAnnounce(messageVar);
                    //calcPlantInfo();
                    endWeather = setTimeout(function () {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The weather is clear again.</span></span><br>");
                        var messageVar = "The weather is clear again";
                        miniAnnounce(messageVar);
                        for (w = 0; w < $(".potSquare").length; w = w + 1) {
                            $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("healthCalc") / 2))
                        }
                        lastWeather = weather;
                        weatherFunc();
                        constitutionBonus = " ";
                        //calcPlantInfo();
                        if (corresNum == plantEq) {
                            plantStats();
                        }
                    }, weatherDuration);
                    //calcPlantInfo();
                    lastWeather = weather;
                    weatherFunc();
                } else if (weather == "A deep freeze") {
                    if (oneOrTwo == 1) {
                        amountToKill = Math.round((array.length * 0.3) + killRange);
                    } else {
                        amountToKill = Math.round((array.length * 0.3) - killRange);
                    }
                    if (amountToKill > 1) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + amountToKill + " plants have frozen solid!</span></span><br>");
                        var messageVar = amountToKill + " plants have frozen solid!";
                        miniAnnounce(messageVar);
                    } else if (amountToKill == 1) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + amountToKill + " plant has frozen solid!</span></span><br>");
                        var messageVar = amountToKill + " plant has frozen solid!";
                        miniAnnounce(messageVar);
                    } else if (amountToKill == 0) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>Your garden has been spared.</span></span><br>");
                        var messageVar = "Your garden has been spared.";
                        miniAnnounce(messageVar);
                    }
                    for (w = 0; w < amountToKill; w = w + 1) {
                        var doThis = setTimeout(function () {
                            plantEq = plantId[Math.floor(Math.random() * array.length)];
                            revertPlant(plantEq);
                            pestArray();
                            plantArray();
                        }, 250);
                    }
                    pestArray();
                    plantArray();
                    moneyMoney();
                    lastWeather = weather;
                    weatherFunc();
                } else if (weather == "Freezing rain") {
                    worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                    $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The rain will last " + (weatherDuration / 1000) + "min.</span></span><br>");
                    var messageVar = "The rain will last " + (weatherDuration / 1000) + "min.";
                    miniAnnounce(messageVar);
                    //calcPlantInfo();
                    endWeather = setTimeout(function () {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The weather is clear again.</span></span><br>");
                        var messageVar = "The weather is clear again.";
                        miniAnnounce(messageVar);
                        for (w = 0; w < $(".potSquare").length; w = w + 1) {
                            $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("healthCalc") / 2))
                        }
                        lastWeather = weather;
                        weatherFunc();
                        constitutionBonus = " ";
                        //calcPlantInfo();
                        if (corresNum == plantEq) {
                            plantStats();
                        }
                    }, weatherDuration);
                } else if (weather == "A cyclone") {
                    var linePick, direction, randIndex;
                    randIndex = Math.floor(Math.random() * 2);
                    if (randIndex == 1) {
                        direction = "leftRight";
                    } else {
                        direction = "upDown";
                    }
                    if (direction == "leftRight") {
                        linePick = Math.floor(Math.random() * (8 * inventory.plots))
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>A cyclone has ravaged row " + (linePick + 1) + "!</span></span><br>");
                        var messageVar = "A cyclone has ravaged row " + (linePick + 1) + "!";
                        miniAnnounce(messageVar);
                        for (w = (linePick * 4); w < ((linePick * 4) + 4); w = w + 1) {
                            revertLine(w);
                        }
                    } else if (direction == "upDown") {
                        linePick = Math.floor(Math.random() * 4)
                        for (w = linePick; w < (8 * inventory.plots); w = w + 4) {
                            revertLine(w);
                        }
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>A cyclone has ravaged column " + (linePick + 1) + "!</span></span><br>");
                        var messageVar = "A cyclone has ravaged column " + (linePick + 1) + "!";
                        miniAnnounce(messageVar);
                    }
                    pestArray();
                    plantArray();
                    moneyMoney();
                    lastWeather = weather;
                    weatherFunc();
                } else if (weather == "A twister") {
                    var linePick, direction, randIndex;
                    randIndex = Math.floor(Math.random() * 2);
                    if (randIndex == 1) {
                        direction = "leftRight";
                    } else {
                        direction = "upDown";
                    }
                    if (direction == "leftRight") {
                        linePick = Math.floor(Math.random() * (8 * inventory.plots))
                        for (w = linePick * 4; w < (linePick * 4) + 4; w = w + 1) {
                            revertLine(w);
                        }
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>A twister has ravaged row " + (linePick + 1) + "!</span></span><br>");
                        var messageVar = "A twister has ravaged row " + (linePick + 1) + "!";
                        miniAnnounce(messageVar);
                    } else if (direction == "upDown") {
                        linePick = Math.floor(Math.random() * 4)
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        for (w = linePick; w < (8 * inventory.plots); w = w + 4) {
                            revertLine(w);
                        }
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>A twister has ravaged column " + (linePick + 1) + "!</span></span><br>");
                        var messageVar = "A twister has ravaged row " + (linePick + 1) + "!";
                        miniAnnounce(messageVar);
                    }
                    pestArray();
                    plantArray();
                    moneyMoney();
                    lastWeather = weather;
                    weatherFunc();
                } else if (weather == "A light shower") {
                    worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                    $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The shower will last " + (weatherDuration / 1000) + "min.</span></span><br>");
                    var messageVar = "The shower will last " + (weatherDuration / 1000) + "min.";
                    miniAnnounce(messageVar);
                    //calcPlantInfo();
                    endWeather = setTimeout(function () {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The weather is clear again.</span></span><br>");
                        var messageVar = "The weather is clear again.";
                        miniAnnounce(messageVar);
                        for (w = 0; w < $(".potSquare").length; w = w + 1) {
                            $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("healthCalc") / 2))
                        }
                        lastWeather = weather;
                        weatherFunc();
                        constitutionBonus = " ";
                        //calcPlantInfo();
                        if (corresNum == plantEq) {
                            plantStats();
                        }
                    }, weatherDuration);
                } else if (weather == "Heavy rain") {
                    worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                    $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The heavy rain will last " + (weatherDuration / 1000) + "min.</span></span><br>");
                    var messageVar = "The heavy rain will last " + (weatherDuration / 1000) + "min.";
                    miniAnnounce(messageVar);
                    //calcPlantInfo();
                    endWeather = setTimeout(function () {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The weather is clear again.</span></span><br>");
                        var messageVar = "The weather is clear again.";
                        miniAnnounce(messageVar);
                        for (w = 0; w < $(".potSquare").length; w = w + 1) {
                            $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("healthCalc") / 2))
                        }
                        lastWeather = weather;
                        weatherFunc();
                        constitutionBonus = " ";
                        //calcPlantInfo();
                        if (corresNum == plantEq) {
                            plantStats();
                        }
                    }, weatherDuration);
                } else if (weather == "A thunderstorm") {
                    if (oneOrTwo == 1) {
                        amountToKill = Math.round((array.length * 0.3) + killRange);
                    } else {
                        amountToKill = Math.round((array.length * 0.3) - killRange);
                    }
                    if (amountToKill > 1) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>Lightning has struck " + amountToKill + " plants!</span></span><br>");
                        var messageVar = "Lightning has struck " + amountToKill + " plants!";
                        miniAnnounce(messageVar);
                    } else if (amountToKill == 1) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>Lightning has struck " + amountToKill + " plant!</span></span><br>");
                        var messageVar = "Lightning has struck " + amountToKill + " plant!";
                        miniAnnounce(messageVar);
                    } else if (amountToKill == 0) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>Your garden has been spared.</span></span><br>");
                        var messageVar = "Your garden has been spared.";
                        miniAnnounce(messageVar);
                    }
                    for (w = 0; w < amountToKill; w = w + 1) {
                        var doThis = setTimeout(function () {
                            plantEq = plantId[Math.floor(Math.random() * array.length)];
                            revertPlant(plantEq);
                            pestArray();
                            plantArray();
                        }, 250);
                    }
                    pestArray();
                    plantArray();
                    moneyMoney();
                    lastWeather = weather;
                    weatherFunc();
                } else if (weather == "A monsoon") {
                    worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                    $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The monsoon will last " + (weatherDuration / 1000) + "min.</span></span><br>");
                    var messageVar = "The monsoon will last " + (weatherDuration / 1000) + "min.";
                    miniAnnounce(messageVar);
                    //calcPlantInfo();
                    //moneyMoney();
                    endWeather = setTimeout(function () {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The weather is clear again.</span></span><br>");
                        var messageVar = "The weather is clear again.";
                        miniAnnounce(messageVar);
                        for (w = 0; w < $(".potSquare").length; w = w + 1) {
                            $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("healthCalc") / 2))
                        }
                        lastWeather = weather;
                        weatherFunc();
                        constitutionBonus = " ";
                        //calcPlantInfo();
                        if (corresNum == plantEq) {
                            plantStats();
                        }
                    }, weatherDuration);
                } else if (weather == "A hurricane") {
                    if (oneOrTwo == 1) {
                        amountToKill = Math.round((array.length * 0.3) + killRange);
                    } else {
                        amountToKill = Math.round((array.length * 0.3) - killRange);
                    }
                    if (amountToKill > 1) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + amountToKill + " plants have been destroyed.</span></span><br>");
                        var messageVar = amountToKill + " plants have been destroyed.";
                        miniAnnounce(messageVar);
                    } else if (amountToKill == 1) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + amountToKill + " plant has been destroyed.</span></span><br>");
                        var messageVar = amountToKill + " plant has been destroyed.";
                        miniAnnounce(messageVar);
                    } else if (amountToKill == 0) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>Your garden has been spared.</span></span><br>");
                        var messageVar = "Your garden has been spared.";
                        miniAnnounce(messageVar);
                    }
                    for (w = 0; w < amountToKill; w = w + 1) {
                        var doThis = setTimeout(function () {
                            plantEq = plantId[Math.floor(Math.random() * array.length)];
                            revertPlant(plantEq);
                            pestArray();
                            plantArray();
                        }, 250);
                    }
                    pestArray();
                    plantArray();
                    moneyMoney();
                    lastWeather = weather;
                    weatherFunc();
                } else if (weather == "A rain storm") {
                    worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                    $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The rain storm will last " + (weatherDuration / 1000) + "min.</span></span><br>");
                    var messageVar = "The rain storm will last " + (weatherDuration / 1000) + "min.";
                    miniAnnounce(messageVar);
                    //calcPlantInfo();
                    endWeather = setTimeout(function () {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>The weather is clear again.</span></span><br>");
                        var messageVar = "The weather is clear again.";
                        miniAnnounce(messageVar);
                        for (w = 0; w < $(".potSquare").length; w = w + 1) {
                            $(".potSquare").eq(w).data("immunity", ($(".potSquare").eq(w).data("healthCalc") / 2))
                        }
                        lastWeather = weather;
                        weatherFunc();
                        constitutionBonus = " ";
                        //calcPlantInfo();
                        if (corresNum == plantEq) {
                            plantStats();
                        }
                    }, weatherDuration);
                } else if (weather == "Heavy winds") {
                    if (oneOrTwo == 1) {
                        amountToKill = Math.round((array.length * 0.3) + killRange);
                    } else {
                        amountToKill = Math.round((array.length * 0.3) - killRange);
                    }
                    if (amountToKill > 1) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + amountToKill + " plants have blown away!</span></span><br>");
                        var messageVar = amountToKill + " plants have blown away!";
                        miniAnnounce(messageVar);
                    } else if (amountToKill == 1) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + amountToKill + " plant has blown away!</span></span><br>");
                        var messageVar = amountToKill + " plant has blown away!";
                        miniAnnounce(messageVar);
                    } else if (amountToKill == 0) {
                        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
                        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>Your garden has been spared.</span></span><br>");
                        var messageVar = "Your garden has been spared.";
                        miniAnnounce(messageVar);
                    }
                    for (w = 0; w < amountToKill; w = w + 1) {
                        var doThis = setTimeout(function () {
                            plantEq = plantId[Math.floor(Math.random() * array.length)];
                            revertPlant(plantEq);
                            pestArray();
                            plantArray();
                        }, 250);
                    }
                    pestArray();
                    plantArray();
                    moneyMoney();
                    lastWeather = weather;
                    weatherFunc();
                }
            }, 1000);
            pestArray();
            plantArray();
            moneyMoney();
        }, timeDiff);
    } else {
        weatherFunc();
    }
}

function seasonMake() {
    var seasonList, startSeason, worldTime, j, seasonId;
    seasonList = [
        "Winter",
        "Spring",
        "Summer",
        "Autumn"
    ];
    seasonId = Math.floor(Math.random() * 4);
    startSeason = seasonList[seasonId];
    season = startSeason.slice(0);
    weatherFunc();
    blinkAlertWeather("#announcementButton");
    worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
    if (season == "Winter") {
        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + season + " is upon you.</span></span><br>");
        var messageVar = "Winter is upon you.";
        miniAnnounce(messageVar);
    } else if (season == "Spring") {
        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + season + " is here!</span></span><br>");
        var messageVar = "Spring is here!";
        miniAnnounce(messageVar);
    } else if (season == "Summer") {
        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + season + " is here!</span></span><br>");
        var messageVar = "Summer is here!";
        miniAnnounce(messageVar);
    } else if (season == "Autumn") {
        var messageVar = "Autumn is here!";
        miniAnnounce(messageVar);
        $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + season + " is here!</span></span><br>");
        var messageVar = "Autumn is here!";
        miniAnnounce(messageVar);
    }
    $(".announcementFirst").remove();
    j = seasonId;
    setInterval(function () {
        worldTime = $("#hourDisplay").text() + ":" + $("#minuteDisplay").text();
        if (j == 3) {
            j = 0;
        } else {
            j = j + 1
        }
        season = seasonList[j];
        if (season == "Winter") {
            $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + season + " is upon you.</span></span><br>");
            var messageVar = "Winter is upon you.";
            miniAnnounce(messageVar);
        } else if (season == "Spring") {
            $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + season + " is here!</span></span><br>");
            var messageVar = "Spring is here!";
            miniAnnounce(messageVar);
        } else if (season == "Summer") {
            $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + season + " is here!</span></span><br>");
            var messageVar = "Summer is here!";
            miniAnnounce(messageVar);
        } else if (season == "Autumn") {
            var messageVar = "Autumn is here!";
            miniAnnounce(messageVar);
            $(".announcementAppend:first").before("<span class='announcementAppend'>" + worldTime + "&nbsp;<span class='underlined'>" + season + " is here!</span></span><br>");
            var messageVar = "Autumn is here!";
            miniAnnounce(messageVar);
        }
    }, 1440000);
}
$(document).ready(function () {
    var timeDiff = Math.floor(Math.random().toFixed(1) * 7000) + 5;
    setTimeout("seasonMake()", timeDiff);
});
// $("#gameHead").click(function () {
//     alert(diseaseId.length);
// });
$(document).ready(function () {
    blinkInv = setInterval(function () {
        blinkElement("#invTab");
    }, 1440);
    blinkMisc = setInterval(function () {
        blinkElement("#miscButton");
    }, 1440);
});

function removePest() {
    var corresNum = $("#potName").html() - 1;
    $(".potSquare").eq(corresNum).data("pestType", "none");
    var plantTypeThing = $(".potSquare").eq(corresNum).data("plantType") + ".PNG";
    $(".potSquare").eq(corresNum).find(".addPot").attr("src", plantTypeThing);
    $(".potSquare").eq(corresNum).focus();
    pestArray();
    plantArray();
    plantStats();
    blinkBugWeed();
    pestInit();
}