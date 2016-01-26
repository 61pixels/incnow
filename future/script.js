var _orderformurl = "https://www.incnow.com/order";
var _accountid, _authkey, _sessionid, _serverurl;
var _cookiesettings = { expires: 365, path: "/", domain: "incnow.com" };
var _countries = [];
var _products = [];

function formatMoney(n) { var c = 2, d = ".", t = ",", s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0; return "$" + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") }
function getUnitPrice(productid, key) {
    var up = 0;
    var pArr = $.grep(_products, function (item, i) { return item.id == productid; });
    if (!pArr.length) return up;
    var p = pArr[0];

    var sid = key ? key.split("-")[0] : null;
    var eid = key ? key.split("-")[1] : null;

    $.each(p.fees, function (fi, fitem) {
        var sitem = apiType("stateTypes", fitem.stateType);
        var eitem = apiType("entityTypes", fitem.entityType);

        if ((sitem == null || sitem.id == sid) && (eitem == null || eitem.id == eid)) {
            up += fitem.amount;
        }
    });

    return up;
}
function setContactInfo(ci) {
    if (!ci) return;
	
    //set readonly
    var lines = [];
    if (ci.firstName && ci.lastName) lines.push(ci.firstName + " " + ci.lastName);
    else if (ci.lastName) lines.push(ci.lastName);
    if (ci.streetAddress) $.each(ci.streetAddress.split("\n"), function (i, item) { lines.push(item); });
    if (ci.city && ci.state && ci.postal) lines.push(ci.city + ", " + ci.state + " " + ci.postal);
    else $.each([ci.city, ci.state, ci.postal], function (i, item) { if (item) lines.push(item); });
    if (ci.country) lines.push(ci.country);
    if (ci.email) lines.push(ci.email);
    if (ci.phone) lines.push(ci.phone);
    $("#contact_readonly").html(lines.join("<br/>"));
};
function setDefaultBillingContactInfo(ci) {
    if (!ci) return;

    //set card
    $("#payment_new_card_first_name_control").val(ci.firstName);
    $("#payment_new_card_last_name_control").val(ci.lastName);
    $("#payment_new_card_postal_control").val(ci.postal)
};
function getPayment() {
    var p = {};

    p.paymentMethodType = $(":radio[name='payment_method']:checked").val();
    p.id = (p.paymentMethodType == 0) ? $("#payment_card_control").val() : "";

    return p;
};
function getOrderEntities() {
	var es = [];
	
	$("[data-entitycontrol]").each(function(i, item) {
		var $ctrl = $(item);
		var $row = $ctrl.closest("[data-entityinfo]");
		
		var pids = $ctrl.val().length ? $ctrl.val().split(",") : [];
		var ei = $row.data("entityinfo");
		
		if (!pids.length || !ei) return true;
		
		var is = [];
		$.each(pids, function(pi, pid) {
			var up = getUnitPrice(pid);
			is.push({
				productId: pid,
				quantity: 1,
				unitPrice: up
			});
		});
		
		var oe = {};
		oe.info = ei;
		oe.items = is;
		es.push(oe);
	});
	
	return es;
};
function getOrder() {
    var o = {};

    //account
    o.account = getAccount();

    //payment
    o.payment = getPayment();

    //order entities
    o.entities = getOrderEntities();

    return o;
};
function getAccount() {
    if (_accountid) {
        var a = {};
        a.id = _accountid;
        a.authKey = _authkey;
        return a;
    }
    else {
        return null;
    }
};
function setAccount(accountid, authkey) {
    _accountid = accountid || null;
    _authkey = authkey || null;
    $.cookie("accountid", _accountid, _cookiesettings);
};
function upsertProfileCard(c) {
    if (!c) return;

    var $o = $("<option>").val(c.profileId).text(c.name);
    var $paymentcardcontrol = $("#payment_card_control");

    var existing_option_found = false;
    $paymentcardcontrol.find("option").each(function (i, item) {
        var $item = $(item);
        if ($item.val() == $o.val()) {
            $item.text($o.text());
            existing_option_found = true;
            return false;
        };
    });
    if (!existing_option_found) $paymentcardcontrol.find("option:first").after($o);

    $paymentcardcontrol.val(c.profileId).trigger("change");
    $("#payment_type_credit_card_wrapper").show();
};
function setPaymentProfiles(p) {
    if (!p) return;
    $.each(p.paymentProfiles.reverse(), function (i, item) { upsertProfileCard(item); });
};
function setEntities(entities) {
	$template = $("[data-entitytemplate]");
    
    var $t = $("<div>");
    $.each(entities, function (i, entity) {
        $.each(entity.entityInfos, function (ei, einfo) {
            if (!einfo.active) return true;
			
            var entity_name = einfo.name;
            var entity_state = einfo.stateType;
            var entity_number = einfo.fileNumber;
            
            var action_control_id = "entity_control_" + einfo.id;
			var entity_label = entity_name + " (" + entity_state + " " + entity_number + ")";

            var $tr = $template.clone(true).show();
			
			$tr.attr("data-entityinfo", "").data("entityinfo", einfo);
			var $lbl = $tr.find("[data-entitylabel]");
			var $ctrl = $tr.find("[data-entitycontrol]");
			
			$lbl.text(entity_label).attr("for", action_control_id);
			$ctrl.attr("id", action_control_id);
			
            $t.append($tr);
        });
    });

    $("#entities_table_wrapper").append($t);
    refreshTotal();
};
function hideLoadingDialog() {
    $("#modal_loading").foundation("reveal", "close");
};
function showLoadingDialog(msg) {
    $("#modal_loading_message").text(msg);
    var $modal = $("#modal_loading");
    if (!$modal.is(".open")) $modal.foundation("reveal", "open");
};
function showErrorDialog(msg) {
    $("#modal_error_message").text(msg);
    var $modal = $("#modal_error");
    if (!$modal.is(".open")) $modal.foundation("reveal", "open");
};
function submitCreditCard(successCallback) {
    //gather card information
    var id = $("#payment_card_control").val();
    var cc = {};
    if (id.length) cc.profileId = id;
    cc.account = getAccount();
    cc.cardNumber = $("#payment_new_card_number_control").val().replace(/\D/g, '');
    cc.firstName = $("#payment_new_card_first_name_control").val();
    cc.lastName = $("#payment_new_card_last_name_control").val();
    cc.expirationMonth = $("#payment_new_card_expiration_month_control").val();
    cc.expirationYear = $("#payment_new_card_expiration_year_control").val();
    cc.cvv = $("#payment_new_card_cvv_control").val().replace(/\D/g, '');
    cc.billingZip = $("#payment_new_card_postal_control").val();

    //submit card
    var url = _baseapiurl + (id.length ? "/updatecreditcard" : "/newcreditcard");
    $.ajax({
        url: url,
        data: JSON.stringify(cc),
        beforeSend: function (x, s) {
            //show loading dialog
            showLoadingDialog("Please allow up to 30 seconds for your credit card to be validated.");
        },
        success: function (msg) {
            //add new card
            debug.log(msg);
            upsertProfileCard(msg);
            $("#payment_new_card_wrapper :text").val("");
            successCallback();
        },
        error: function (x, e) {
            hideLoadingDialog();
            //display error
            debug.error(x, e);
            var msg = "Unable to validate credit card";
            if (x) {
                var rt = $.parseJSON(x.responseText);
                if (rt) if (rt.ExceptionMessage) msg = rt.ExceptionMessage;
            }
            showErrorDialog(msg);
        }
    });
};
function submitOrder() {
    var o = getOrder();
    var url = _sessionid ? $.param.querystring(_baseapiurl + "/order", { sessionId: _sessionid, serverUrl: _serverurl }) : _baseapiurl + "/order";
    debug.log("submitting order", o, url);

    $.ajax({
        url: url,
        data: JSON.stringify(o),
        beforeSend: function (x, s) {
            //show loading dialog
            showLoadingDialog("Please allow up to 30 seconds for your payment to be securely encrypted with 128-bit encryption and sent to our secure server.");
        },
        success: function (msg) {
            debug.log(msg);
			
			if (msg.transaction) {
				//hide form
				$("#form_pane").hide();

				//show thank you
				$("#thank_you_pane").show();

				//thank you info
				$("#thank_you_transaction").text(msg.transaction.name);
				$("#thank_you_amount").text(formatMoney(msg.transaction.amount));
				$("#thank_you_payment").text(msg.transaction.paymentMethodTypeName + ((msg.transaction.paymentProfileName) ? " " + msg.transaction.paymentProfileName : ""));

			    //thank you cta
				var a = getAccount();
				var d = {};
				d.accountId = a.id;
				d.authKey = a.authKey;
				d.relatedId = msg.transaction.id;

				$.ajax({
				    type: "GET",
                    data: d,
				    url: _baseapiurl + "/reviewurl",
				    success: function (msg) {
				        $("#iframe_review").attr("src", msg);
				        $("#btn_thank_you_cta").on("click", function () {
				            $("#modal_review").foundation("reveal", "open");
				        });
				    }
				});

				//scroll to top
				scrollTo(0, 0);

				//conversion order item info
				var oitems = [];
				$.each(o.entities, function(ei, eitem){
					$.each(eitem.items, function (eii, eiitem) {
						var ei = eitem.info;
						var p = $.grep(_products, function (item, i) { return item.id == eiitem.productId; })[0];
						var s = apiType("stateTypes", ei.stateType);
						var e = apiType("entityTypes", ei.type);
						
						var oitem = {};
						oitem.productId = p.id;
						oitem.productName = p.name;
						oitem.quantity = eiitem.quantity;
						oitem.unitPrice = eiitem.unitPrice;
						oitem.stateName = s.label;
						oitem.entityName = e.label;
						oitems.push(oitem);
					});
				});

				//google tag manager
				var gtm_transaction = {
					'id': msg.id,
					'affiliation': '',
					'revenue': msg.amount,
					'tax': '',
					'shipping': '',
					'coupon': ''
				};
				var gtm_products = [];
				$.each(oitems, function (i, item) {
					gtm_products.push({
						'name': item.productName,
						'id': item.productId,
						'price': item.unitPrice,
						'brand': '',
						'category': item.stateName + " " + item.entityName,
						'variant': '',
						'quantity': item.quantity,
						'coupon': ''
					});
				});
				var gtm_purchase = {
					'actionField': gtm_transaction,
					'products': gtm_products
				};
				var gtm_ecommerce = {
					'purchase': gtm_purchase
				};
				var gtm_item = {
					'ecommerce': gtm_ecommerce
				};
				debug.log("pushing gtm item", gtm_item);
				dataLayer.push(gtm_item);
				dataLayer.push({ 'event': 'futureTransaction' });
			}
			else {
				setTimeout(function () { showErrorDialog(msg.error || "Unable To Submit Valid Payment"); }, 250);
			};
        },
        error: function (x, e) {
            //display error
            debug.error(x, e);
            var msg = "Unable to submit payment";
            if (x) {
                var rt = $.parseJSON(x.responseText);
                if (rt) if (rt.ExceptionMessage) msg = rt.ExceptionMessage;
            }
			setTimeout(function () { showErrorDialog(msg); }, 250);
            $("#btn_edit_card_wrapper").show();
        },
        complete: function (x, t) {
            //hide loading dialog
            hideLoadingDialog();
        }
    });
};

function refreshTotal() {
    var t = 0;

    var oes = getOrderEntities();
    $.each(oes, function (i, oe) {
		$.each(oe.items, function (i, oeitem) {
			t += (oeitem.unitPrice * oeitem.quantity);
		});
    });

    $("#btn_checkout").prop("disabled", t <= 0);
    
    if (t > 0) {
        $("[data-productid]:checked").each(function (i, item) {
            var $item = $(item);
            var pid = $item.data("productid");
            var p = getUnitPrice(pid);
            t += p;
        });
    };

    $("#checkout_total").text(formatMoney(t));
};

function initEntityTemplate() {
	$("option[data-productids]").each(function(i, item){
		var $item = $(item);
		var pids = $item.data("productids");
		var txts = [];
		
		var up = 0;
		$.each(pids, function(pidi, pid) { 
			var pArr = $.grep(_products, function (item, i) { return item.id == pid; });
			if (!pArr.length) return true;
			var p = pArr[0];
			txts.push(p.name);
			up += getUnitPrice(pid);
		});
		
		$item.val(pids.join(",")).text(txts.join(", ")).attr("data-unitprice", up);
	});
	
	//:has seems to have performance issues in non webkit browsers...
	$("select").each(function(i, item) {
		var $select = $(item);
		if ($select.has("option[data-productids]")) $select.on("change", function() { refreshTotal(); }).trigger("change");
	});
};

function initPayment() {
    var $paymentmethods = $(":radio[name='payment_method']");
    var $paymenttypewrappers = $(".payment_type_wrapper");
    var $paymentcard = $("#payment_card_control");
    var $paymentcardwraper = $("#payment_new_card_wrapper");
    var $btneditcard = $("#btn_edit_card");

    $paymentmethods.on("click change", function () {
        var type = $paymentmethods.filter(":checked").val();

        $paymenttypewrappers.each(function (i, item) {
            var $item = $(item);
            var show = $item.data("paymenttype") == type;
            $item.toggle(show);
        });

        refreshTotal();
    }).trigger("change");

    $paymentcard.on("change", function () {
        var is_new_card = $paymentcard.val() == "";
        $paymentcardwraper.toggle(is_new_card);
        $btneditcard.prop("disabled", is_new_card);
    }).trigger("change");

    $btneditcard.on("click", function () {
        $paymentcardwraper.show();
    });
};

function initCheckout() {
    $("#btn_checkout").on("click", function () {
        //tou
        if (!$("#tou_agree").prop("checked")) {
            showErrorDialog("Please agree to the Terms of Use");
            return;
        };

        //form inputs
        var $wrapper = $("");
        $(":input[required]:visible").each(function (i, item) {
            var $input = $(item);
            if ($input.val() == "") {
                $wrapper = $input.closest("[data-requiredwrapper]");
                return false;
            };
        });
        if ($wrapper.length) {
            $wrapper[0].scrollIntoView();
            showErrorDialog("Please fill out all fields");
            return;
        };

        //create card if needed
        var p = getPayment();
        if (p.paymentMethodType == 0 && !p.id.length) {
            //create and submit upon success
            submitCreditCard(submitOrder);
        }
        else {
            //submit
            submitOrder();
        };
    });
};

function finishSetup() {
    var qs = $.deparam.querystring(true);

    if (qs.sessionId && qs.serverUrl) {
        _sessionid = qs.sessionId;
        _serverurl = qs.serverUrl;
        $("body").addClass("chromeless");
    };

    if (qs.id && qs.key) {
        var d = {};
        d.id = qs.id;
        d.authKey = qs.key;
        showLoadingDialog("Loading Entities");
		
		$.ajax({
			type: "GET",
			url: _baseapiurl + "/account",
			data: d,
			success: function (msg) {
				debug.log(msg);
				var a = msg || {};
				
				if (a.id) {
					$.ajax({
						type: "GET",
						url: _baseapiurl + "/entities",
						data: d,
						success: function (msg) {
							debug.log(msg);
							var es = msg || [];
							if (es.length) {
								setAccount(a.id, d.authKey);
								setEntities(es);
								setContactInfo(a.contactInfo);
								setPaymentProfiles(a.anetProfile);
								if (_sessionid) setDefaultBillingContactInfo(a.contactInfo);
								$("#default_pane").hide();
								$("#form_pane").show();
							}
							else {
								setTimeout(function () { showErrorDialog("No Entities Found"); }, 250);
							};
						},
						error: function (x, e) {
							debug.error(x);
							setTimeout(function () { showErrorDialog("Unable To Authenticate Entities"); }, 250);
						},
						complete: function() {
							hideLoadingDialog();
						}
					});
				}
				else {
					hideLoadingDialog();
					setTimeout(function () { showErrorDialog("Invalid Account Credentials"); }, 250);
				};
			},
			error: function (x, e) {
				debug.error(x);
				hideLoadingDialog();
				setTimeout(function () { showErrorDialog("Unable To Authenticate Account"); }, 250);
			}
		});
    };
};

function init() {
	$.ajax({
		type: "GET",
		url: _baseapiurl + "/product",
		success: function (msg) {
			_products = msg;
			initEntityTemplate();
		}
	});
	
    initPayment();
    
    initCheckout();

    finishSetup();
};

$(function () {
	//$.ajax defaults
	$.ajaxSetup({
		type: "POST",
		data: "{}",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		async: true,
		cache: false,
		success: function (msg) {
			debug.log(msg);
		},
		error: function (x, e) {
			debug.error(x);
		}
	});

	init();
});
