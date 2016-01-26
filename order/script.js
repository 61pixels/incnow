var _accountid, _authkey, _leadid, _templeadid, _sessionid, _serverurl;var _cookiesettings = { expires: 365, path: "/", domain: "incnow.com" };
var _updatinglead = false;
var _isexistingordertype = false;
var _isinternational = false;
var _isdelaware = false;
var _key = "0-0";
var _countries = [];
var _products = [];
var _qualificationproductid = "01t80000003QCvLAAW";
var _promo_buffer = null;
function formatMoney(n) { var c = 2, d = ".", t = ",", s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0; return "$" + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") }
function getProductIds() {
	var arr = [];

	$.each(_products, function (pi, pitem) {
		if (getUnitPrice(pitem.id, _key) > 0 && (_sessionid || !pitem.inOfficeOnly)) arr.push(pitem.id);
	});

	return arr;
}
function getUnitPrice(productid, key) {
	var up = 0;
	var pArr = $.grep(_products, function (item, i) { return item.id == productid; });
	if (!pArr.length) return up;
	var p = pArr[0];

	var sid = key.split("-")[0];
	var eid = key.split("-")[1];

	$.each(p.fees, function (fi, fitem) {
		var sitem = apiType("stateTypes", fitem.stateType);
		var eitem = apiType("entityTypes", fitem.entityType);

		if ((sitem == null || sitem.id == sid) && (eitem == null || eitem.id == eid)) {
			up += fitem.amount;
		}
	});

	return up;
}
function getFeeStateIds(fees) {
	var arrStateIds = [];

	$.each(fees, function (fi, fitem) {
		var e = apiType("stateTypes", fitem.entityType);
		var eid = (e) ? e.id : _key.split("-")[1];
		if (eid == _key.split("-")[1]) {
			var s = apiType("stateTypes", fitem.stateType);
			if (s) {
				if ($.inArray(s.id, arrStateIds) == -1) arrStateIds.push(s.id);
			}
		}
	});

	return arrStateIds;
}
function initCountriesAndStates() {
	//get dataset
	$.ajax({
		type: "GET",
		url: _baseapiurl + "/dataset/country",
		success: function (msg) {
			_countries = msg;

			//create selects
			var $all = $("<select>");
			var $apostille = $("<select>").append($("<option>").val("").text("Choose One..."));
			$.each(_countries, function (i, item) {
				$all.append($("<option>").val(item.name).text(item.name));
				if (item.isHagueMember) $apostille.append($("<option>").val(item.name).text(item.name));
			});

			//init country selects
			$("#contact_country_control").on("change", function () { _isinternational = $(this).val() != "United States"; refreshServices(); });
			$("#contact_country_control, #future_country_control, #partner_country_control").html($all.html()).on("change", function () {
				var countryName = $(this).val();
				var stateSelectName = $(this).attr("id").replace("country", "state");
				var stateSelect = $("#" + stateSelectName + "_select");
				var stateText = $("#" + stateSelectName);

				var c = $.grep(_countries, function (item, i) { return item.name == countryName })[0];

				if (c.states.length) {
					var ss = $("<select>");
					ss.append($("<option>").val("").text("Choose One..."));
					$.each(c.states, function (i, item) { ss.append($("<option>").val(item.abbreviation).text(item.name)); });

					stateText.hide();
					stateSelect.html(ss.html()).show();
				}
				else {
					stateSelect.hide();
					stateText.val("").show();
				};

				refreshServices();
			}).trigger("change");

			//apostille
			$("select[data-apostillecountry]").html($apostille.html());
		},
		complete: function () {
			hideLoadingDialog();
		}
	});
};
function getContactInfo(type) {
	var ci = {};
	ci.firstName = $("#" + type + "_first_name_control").val() || "";
	ci.lastName = $("#" + type + "_last_name_control").val() || $("#" + type + "_name_control").val() || "";
	ci.streetAddress = $("#" + type + "_address_control").val() || "";
	ci.city = $("#" + type + "_city_control").val() || "";
	ci.state = $("#" + type + "_state_control").val() || "";
	ci.postal = $("#" + type + "_postal_control").val() || "";
	ci.country = $("#" + type + "_country_control").val() || "";
	ci.email = $("#" + type + "_email_control").val() || "";
	ci.phone = $("#" + type + "_phone_control").val() || "";

	if (ci.firstName != "" && ci.lastName == "") {
		ci.lastName = ci.firstName;
		ci.firstName = "";
	}

	return ci;
};
function setContactInfo(ci) {
	if (!ci) return;

	//hide editable
	$("#contact_editable_wrapper").hide();

	//set editable
	var type = "contact"
	$("#" + type + "_first_name_control").val(ci.firstName);
	$("#" + type + "_last_name_control").val(ci.lastName);
	$("#" + type + "_address_control").val(ci.streetAddress ? ci.streetAddress.split("\n").join(", ") : null);
	$("#" + type + "_city_control").val(ci.city);
	$("#" + type + "_postal_control").val(ci.postal).trigger("change");
	$("#" + type + "_email_control").val(ci.email);
	$("#" + type + "_phone_control").val(ci.phone);

	var c = ci.country;
	if (c) {
		var $country = $("#" + type + "_country_control");
		$country.find("option").each(function (i, item) {
			var $o = $(item);
			if ($o.val().toUpperCase() == c.toUpperCase() || $o.text().toUpperCase() == c.toUpperCase()) {
				$country.val($o.val());
				return false;
			};
		});
		$country.trigger("change");
	};

	var s = ci.state;
	if (s) {
		var $state = $("#" + type + "_state_control_select");
		$state.find("option").each(function (i, item) {
			var $o = $(item);
			if ($o.val().toUpperCase() == s.toUpperCase() || $o.text().toUpperCase() == s.toUpperCase()) {
				$state.val($o.val());
				return false;
			};
		});
		$state.trigger("change");
		$("#" + type + "_state_control").val(ci.state).trigger("change");
	};

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
function getEntityInfo() {
	var ei = {};
	var $companystate = $("#company_state_control");
	var $companytype = $("#company_type_control");
	var $companyname = $("#company_name_control");

	//is there entity info?
	if ($companyname.data("entityinfo")) {
		ei = $companyname.data("entityinfo");
	}
	else {
		ei.name = $companyname.val();
		ei.stateType = $companystate.val();
		ei.type = $companytype.val();
		ei.id = null;
		ei.active = null;
		ei.incorporationDate = null;
		ei.fileNumber = null;
	}

	return ei;
};function getParties() {	var arr = [];		if (!_isexistingordertype) {		$("[data-partytype]:visible").each(function(i, item) {			var $party = $(item);						//check for [data-name]			if ($party.find("[data-name]").length == 0) return true;						//get info			var type = $party.data("partytype");			var name = $party.find("[data-name]").val();			var ownership = $party.find("[data-ownership]").val();			var taxmatters = $party.find("[data-taxmatters]").prop("checked");			var shares = $party.find("[data-shares]").val();			var contactinfo = type == 8 ? getContactInfo("partner") : null;						//skip no name			if (name == "") return true;						//find party			var pi = -1;			$.each(arr, function(ai, aitem) {				if (aitem.contactInfo.lastName.toUpperCase() == name.toUpperCase()) {					pi = ai;					return true;				};			});			if (pi == -1) {				arr.push({ contactInfo: { lastName: name }, titles: [], ownership: 0, shares: 0, isTaxMember: false });				pi = arr.length - 1;			};						//set info			arr[pi].titles.push(type);			if (ownership) arr[pi].ownership = ownership;			if (taxmatters) arr[pi].isTaxMember = taxmatters;			if (shares) arr[pi].shares = shares;			if (contactinfo) arr[pi].contactInfo = contactinfo;		});	};		return arr;};
function getItems() {
	var arr = [];

	//add package
	var $orderpackage = $("#order_package_control");
	if ($orderpackage.is(":visible")) {
		var id = $orderpackage.val();
		if (id != "") {
			var $option = $($.grep($orderpackage.children(), function (item, i) { return $(item).val() == id; })[0]);//TODO: clean this up
			var up = $option.data("unitprice");
			var q = 1;
			var d = {};
			arr.push({
				productId: id,
				unitPrice: up,
				quantity: q,
				details: d
			});
		};
	};

	//add additional parties
	$(".parties_wrapper[data-includedparties][data-additionalpartyproductid]:visible").each(function (i, item) {
		var $wrapper = $(item);
		var $templates = $wrapper.find("[data-partytemplate]");
		var included_party_count = $wrapper.data("includedparties");
		var id = $wrapper.data("additionalpartyproductid");

		var party_count = 0;
		$templates.each(function (pi, pitem) {
			var all_text_inputs_filled_out = true;
			$(pitem).find(":text").each(function (ti, titem) { if ($(titem).val() == "") all_text_inputs_filled_out = false; });
			if (all_text_inputs_filled_out) party_count += 1;
		});

		if (party_count > included_party_count) {
			var up = getUnitPrice(id, _key); //TODO: should this be set somewhere else?
			var q = party_count - included_party_count;
			var d = {};
			arr.push({
				productId: id,
				unitPrice: up,
				quantity: q,
				details: d
			});
		};
	});

	//add services
	$(".services_wrapper [data-productid]:visible").each(function (i, item) {
		var $p = $(item);
		var $c = $p.find(".service_control");
		var selected = $c.is(":checkbox") ? $c.prop("checked") : ($c.val() > 0);

		if (selected) {
			var id = $p.data("productid");
			var up = $c.attr("data-unitprice");//hack for qualification
			var q = $c.is(":checkbox") ? 1 : $c.val();
			var d = {};
			$p.find("[data-detailkey]").each(function (di, ditem) {
				var $d = $(ditem);
				var key = $d.data("detailkey");
				var val = $d.val();
				d[key] = val;
			});
			arr.push({
				productId: id,
				unitPrice: up,
				quantity: q,
				details: d
			});
		};
	});

	//add payment fees
	var $paymentmethod = $(":radio[name='payment_method']:checked");
	var id = $paymentmethod.data("productid");
	if (id) {
		var up = getUnitPrice(id, _key);
		var q = 1;
		var d = {};
		arr.push({
			productId: id,
			unitPrice: up,
			quantity: q,
			details: d
		});
	};

	return arr;
};
function getPayment() {
	var p = {};

	p.paymentMethodType = $(":radio[name='payment_method']:checked").val();
	p.id = (p.paymentMethodType == 0) ? $("#payment_card_control").val() : "";

	return p;
};
function getOrder() {
	var $orderpromo = $("#order_promo_code");

	var o = {};

	//lead
	o.lead = getLead();

	//account
	o.account = getAccount();

	//payment
	o.payment = getPayment();

	//requests
	o.requests = $("#special_requests_control").val();

	//contact
	o.contact = $("#future_contact_same").is(":visible:not(:checked)") ? getContactInfo("future") : null;

	//promo code
	o.promoCode = ($orderpromo.is(":visible") && $orderpromo.data("discount") > 0) ? $orderpromo.val() : null;
	o.promoCodeDiscount = ($orderpromo.is(":visible") && $orderpromo.data("discount") > 0) ? $orderpromo.data("discount") : null;
	o.promoCodeProductId = ($orderpromo.is(":visible") && $orderpromo.data("discount") > 0) ? $orderpromo.data("discountproductid") : null;

	var ei = getEntityInfo();
	var items = getItems();	var parties = getParties();
	//qualification
	var q = $.grep(items, function (item, i) { return item.productId == _qualificationproductid; })[0];
	if (q) {
		//get new state
		var new_state = apiType("stateTypes", q.details["state"]);

		if (new_state) {
			//add homestate to qualification item
			q.details["homestate"] = apiType("stateTypes", ei.stateType).label;

			//rebuild items
			var new_key = new_state.id + "-" + _key.split("-")[1];
			var new_items = [q];
			$.each(items, function (i, item) {
				if (item.productId != q.productId) {
					var up = getUnitPrice(item.productId, new_key);
					if (up > item.unitPrice) item.unitPrice = up;
					new_items.push(item);
				};
			});
			items = new_items;

			//rebuild entityinfo
			var new_entity = {};
			$.extend(new_entity, ei);
			for (var property in new_entity) {
				switch (property) {
					case "name":
						//leave it
						break;
					case "stateType":
						new_entity[property] = new_state.id;
						break;
					case "type":
						var ne = apiType("entityTypes", new_entity.type);
						new_entity[property] = (ne) ? (ne.superType ? ne.superType : ne.id) : 0;
						break;
					default:
						new_entity[property] = null;
				};
			};
			ei = new_entity;
		};
	};

	//entity
	var e = {};
	e.info = ei;
	e.items = items;	e.parties = parties;
	o.entities = [e];

	return o;
};
function getLead() {
	if (_accountid) return null;

	var lead = {};

	//ids
	lead.id = _leadid || $.cookie("leadid");
	lead.tempId = _templeadid || ($.cookie("templeadid") ? $.cookie("templeadid") : _tempid);

	//contact info
	lead.contactInfo = getContactInfo("contact");

	//entity info
	lead.entityInfo = getEntityInfo();

	//description & leadsource
	lead.description = $("#special_requests_control").val();
	lead.leadSourceType = _isexistingordertype ? 4 : 3;

	return lead;
};
function setLead(leadid, templeadid) {
	_leadid = leadid || null;
	_templeadid = templeadid || null;
	$.cookie("leadid", _leadid, _cookiesettings);
	$.cookie("templeadid", _templeadid, _cookiesettings);
};
function updateLead() {
	if (_updatinglead || _accountid) return;

	var lead = getLead();

	if (lead.contactInfo.lastName != "" || lead.contactInfo.email != "") {
		_updatinglead = true;
		$.ajax({
			url: _baseapiurl + "/lead",
			data: JSON.stringify(lead),
			success: function (msg) {
				_updatinglead = false;
				setLead(msg.id, msg.tempId);
			},
			error: function () {
				_updatinglead = false;
			}
		});
	}
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
function addProfileCard(c) {
	if (!c) return;

	var $o = $("<option>").val(c.profileId).text(c.name);
	$("#payment_card_control option:first").after($o);
	$("#payment_card_control").val(c.profileId).trigger("change");
	$("#payment_type_credit_card_wrapper").show();
};
function setPaymentProfiles(p) {
	if (!p) return;
	$.each(p.paymentProfiles.reverse(), function (i, item) { addProfileCard(item); });
};
function hideLoadingDialog() {
	$("#modal_loading").foundation("reveal", "close");
};
function showLoadingDialog(msg) {
	$("#modal_loading_message").text(msg);
	var $modal = $("#modal_loading");	if (!$modal.is(".open")) $modal.foundation("reveal", "open");
};
function showErrorDialog(msg) {
	$("#modal_error_message").text(msg);
	var $modal = $("#modal_error");	if (!$modal.is(".open")) $modal.foundation("reveal", "open");
};
function submitNewCreditCard(successCallback) {
	//gather new card information
	var cc = {};
	cc.lead = getLead();
	cc.account = getAccount();
	cc.cardNumber = $("#payment_new_card_number_control").val().replace(/\D/g, '');
	cc.firstName = $("#payment_new_card_first_name_control").val();
	cc.lastName = $("#payment_new_card_last_name_control").val();
	cc.expirationMonth = $("#payment_new_card_expiration_month_control").val();
	cc.expirationYear = $("#payment_new_card_expiration_year_control").val();
	cc.cvv = $("#payment_new_card_cvv_control").val().replace(/\D/g, '');
	cc.billingZip = $("#payment_new_card_postal_control").val();

	//submit new card
	$.ajax({
		url: _baseapiurl + "/newcreditcard",
		data: JSON.stringify(cc),
		beforeSend: function (x, s) {
			//show loading dialog
			showLoadingDialog("Please allow up to 30 seconds for your credit card to be validated.");
		},
		success: function (msg) {
			//add new card
			debug.log(msg);
			addProfileCard(msg);
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
			showLoadingDialog("Please allow up to 30 seconds for your order to be securely encrypted with 128-bit encryption and sent to our secure server.");
		},
		success: function (msg) {
			debug.log(msg);
			if (msg.account) setAccount(msg.account.id, msg.account.authKey);
			if (msg.error) showErrorDialog(msg.error);
			else {
				if (msg.transaction) {
					setLead(null, null);					var tr = msg.transaction;
					//hide form					$("#form_pane").hide();					//show thank you					$("#thank_you_pane").show();					//thank you info					$("#thank_you_transaction").text(tr.name);					$("#thank_you_amount").text(formatMoney(tr.amount));					$("#thank_you_payment").text(tr.paymentMethodTypeName + ((tr.paymentProfileName) ? " " + tr.paymentProfileName : ""));					$("#btn_new_order").attr("href", $.param.querystring(location.href, {						accountid: (tr.account) ? tr.account.id : _accountid,						authkey: (tr.account) ? tr.account.authKey : _authkey,						utm_source: "order_thank_you",						utm_medium: "order_thank_you",						utm_campaign: "order_thank_you"					}));

					//conversion order item info
					var s = apiType("stateTypes", o.entities[0].info.stateType);
					var e = apiType("entityTypes", o.entities[0].info.type);
					var oitems = [];
					$.each(o.entities, function (ei, eitem) {
						$.each(eitem.items, function (ii, iitem) {
							var p = $.grep(_products, function (pitem, pi) { return pitem.id == iitem.productId; })[0];
							var pc = o.promoCodeProductId == p.id ? o.promoCode : "";

							var oitem = {};
							oitem.productId = p.id;
							oitem.productName = p.name;
							oitem.quantity = iitem.quantity;
							oitem.unitPrice = iitem.unitPrice;
							oitem.stateName = s.label;
							oitem.entityName = e.label;
							oitem.promoCode = pc;

							oitems.push(oitem);
						});
					});

					//google tag manager
					var gtm_transaction = {
						'id': tr.id,
						'affiliation': '',
						'revenue': tr.amount,
						'tax': '',
						'shipping': '',
						'coupon': o.promoCode
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
							'coupon': item.promoCode
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
					dataLayer.push({'event': 'IncNowTransaction'});
				}
				else showErrorDialog("Transaction not found");
			};
		},
		error: function (x, e) {
			//display error
			debug.error(x, e);
			var msg = "Unable to submit order";
			if (x) {
				var rt = $.parseJSON(x.responseText);
				if (rt) if (rt.ExceptionMessage) msg = rt.ExceptionMessage;
			}
			showErrorDialog(msg);
		},
		complete: function (x, t) {
			//hide loading dialog
			hideLoadingDialog();
		}
	});
};

function refreshServices() {
	//show conditional
	$("[data-new], [data-existing], [data-domestic], [data-international], [data-delaware]").show();

	//get valid products
	var pids = getProductIds();

	//rebuild packages
	var $orderpackage = $("#order_package_control");
	if ($orderpackage.data("options")) {
		var $packages = $("<select>");
		$orderpackage.data("options").each(function (i, item) {
			var $item = $(item);
			var pid = $item.val();
			var show = ($.inArray(pid, pids) > -1) && ($item.is("[data-delaware]") ? _isdelaware : true);
			if (show) {
				var up = getUnitPrice(pid, _key);
				$item.attr("data-unitprice", up);				if ($item.is("[data-optiontext]")) $item.text($item.data("optiontext"));
				$packages.append($item);
			}
		});		if ($orderpackage.html() != $packages.html()) {			$orderpackage.html($packages.html());		};
	};

	//toggle services
	$(".services_wrapper [data-productid]").each(function (i, item) {
		var $item = $(item);
		var pid = $item.data("productid");
		var show = $.inArray(pid, pids) > -1;
		$item.toggle(show);
		if (show) {
			//make sure wrapper is visible
			$item.closest(".services_wrapper").show();
		};
	});
	//hide conditional
	if (_isexistingordertype) $("[data-new]").hide();
	else $("[data-existing]").hide();
	if (_isinternational) $("[data-domestic]").hide();
	else $("[data-international]").hide();
	if (!_isdelaware) $("[data-delaware]").hide();
	//disabled products	var selected_items = getItems();	$(".services_wrapper [data-disableforproductids]:visible").each(function (i, item) {		var $item = $(item);		var dfpids = $item.data("disableforproductids");		if (!$.isArray(dfpids)) dfpids = dfpids.split(",");		if ($.grep(selected_items, function (sitem, si) { return $.inArray(sitem.productId, dfpids) > -1; }).length) {			$item.hide();		};	});	$(".services_wrapper:not(:has([data-productid]:visible))").hide();	//update unit prices	$(".services_wrapper [data-productid]:visible .service_control").trigger("change");

	//promo code
	var $orderpromo = $("#order_promo_code");
	var $orderpromoresult = $("#order_promo_code_result");
	var pc = $orderpromo.val();
	if (!$orderpromo.is(":visible") || pc == "") {
		$orderpromo.data("discount", 0);
		$orderpromoresult.text("");
		refreshSummary();
	} else {
		var pids = [];
		$.each(getItems(), function (i, item) { pids.push(item.productId); });

		var d = {};
		d.code = pc;
		d.productIds = pids;

		$.ajax({
			type: "GET",
			url: _baseapiurl + "/promo",
			data: d,
			cache: true,
			success: function (msg) {
				var discount = msg.discount;
				var pid = msg.productId;
				var txt = discount > 0 ? ("Valid for " + formatMoney(discount) + " off") : "Invalid Code";

				$orderpromo.data("discount", discount).data("discountproductid", pid);
				$orderpromoresult.text(txt);
			},
			error: function () {
				$orderpromo.data("discount", 0);
				$orderpromoresult.text("");
			},
			complete: function () {
				refreshSummary();
			}
		});
	};
};

function refreshSummary() {
	var o = getOrder();
	var company_name = null;
	var items = [];
	var promo = null;

	if (o.entities.length) {
		company_name = o.entities[0].info.name
		items = o.entities[0].items;
	};

	if (o.promoCodeDiscount) {
		promo = {
			code: o.promoCode,
			discount: o.promoCodeDiscount
		};
	};

	//name
	$("#order_summary_company").text(company_name);

	//items
	var total = 0;
	var $summary = $("<ul>");
	$.each(items, function (i, item) {
		var p = $.grep(_products, function (pitem, pi) { return pitem.id == item.productId; })[0];
		if (!p) return true;
		var up = item.unitPrice;
		var q = item.quantity;
		total += (up * q);
		var txts = [];
		if (q > 1) txts.push(q + "x");
		txts.push(p.name);
		var txt = txts.join(" ");		var $i = $("<i>").addClass("fa-li fa fa-check-square");
		var $li = $("<li>").text(txt).prepend($i);		//check for summary items		var psi = productSummaryItems(p.id, _key);		if (psi.length) {			var $ps = $("<ul>").addClass("fa-ul");			$.each(psi, function (si, sitem) {				var included = sitem.included;				var txt = sitem.text;				var $i = $("<i>").addClass("fa-li fa").addClass(included ? "fa-check" : "fa-close");				$ps.append($("<li>").addClass(included ? "product_summary_item_include" : "product_summary_item_exclude").text(txt).prepend($i));			});			$li.append($ps);		};
		$summary.append($li);
	});
	//promo code
	if (promo) {
		total -= promo.discount;
		var txt = ("-" + formatMoney(promo.discount) + " Promo Code");
		var $li = $("<li>").text(txt);
		$summary.append($li);
	}
	$("#order_summary_list").html($summary.html());

	//total
	$("#order_total").text(formatMoney(total));
	$("#btn_checkout").prop("disabled", total <= 0);
};

function initType() {
	var $ordertypes = $(":radio[name='order_type']");
	var $companystate = $("#company_state_control");

	$ordertypes.on("click change", function () {
		var t = $ordertypes.filter(":checked").val();
		var pv = $companystate.data("preferredvalue");
		_isexistingordertype = t == "existing";
		var $s = $("<select>");
		$.each(_staticdata.stateTypes, function (i, item) {
			//only show DE, FL, NV for new order type
			if (i < 3 || _isexistingordertype) {
				var $o = $("<option>").text(item.name).val(item.id);
				if (item.id == pv) $o.attr("selected", "selected");
				$s.append($o);
			};
		});
		$companystate.html($s.html()).trigger("change");
	});
};

function initCompany() {
	var $companystate = $("#company_state_control");
	var $companytype = $("#company_type_control");
	var $companyname = $("#company_name_control");
	var $existingcompanyname = $("#company_existing_name_control");
	var $partysection = $("#parties_section");
	var $partywrappers = $(".parties_wrapper");
	var $packagecomparison = $("#order_package_comparison");	
	$existingcompanyname.select2({
		tags: true,
		//minimumInputLength: 3,
		templateSelection: function (item) {
			var txt = item.text;
			var info = item.info;

			$companyname.val(txt).data("entityinfo", info);

			if (info) {
				var e = apiType("entityTypes", info.type);
				var t = e.superType ? e.superType : e.id;
				$companytype.val(t).trigger("change");
			}
			else {
				$companyname.trigger("change");
			}

			return txt;
		},
		ajax: {
			url: _baseapiurl + "/lookupentity",
			dataType: "json",
			delay: 250,
			cache: true,
			data: function (params) {
				var d = {};
				d.query = params.term || "";
				d.entityStateType = $companystate.val();
				return d;
			},
			processResults: function (data, params) {
				var term = params.term || "";
				var arr = [];
				if (term.length >= 3) {
					$.each(data, function (i, item) {
						var txt = item.name;
						if (item.fileNumber) txt += " (#" + item.fileNumber + ")";
						arr.push({
							id: txt,
							text: txt,
							info: item
						});
					});
				};
				return {
					results: arr
				};
			}
		}
	});

	$companyname.on("keyup", function () {		$companyname.data("entityinfo", null);
		refreshSummary();
	});	$companyname.on("change", function () {		refreshSummary();	});

	$companytype.on("change", function () {
		_key = $companystate.val() + "-" + $companytype.val();
		if (_isexistingordertype) {
			$companyname.removeAttr("title");
			$partysection.hide();
		}
		else {
			//endings
			var e = apiType("entityTypes", _key.split("-")[1]);
			var endingsstring = "'" + e.endings.join("', '") + "'";
			var companynamehelper = e.label + " name must end with one of the following: " + endingsstring;
			$companyname.attr("title", companynamehelper);

			//toggle parties
			$partysection.show();
			$partywrappers.each(function (i, item) {
				var $item = $(item);
				var tog = $.inArray(_key, $item.data("stateentitytypes")) > -1;
				$item.toggle(tog);
			});
		};
		//package comparison		var pcl = null;		var pc = packageComparison(_key);		if (pc) {			if (pc.link) pcl = pc.link;		};		if (pcl) $packagecomparison.attr("href", pcl).show();		else $packagecomparison.hide();		
		refreshServices();
	});

	$companystate.on("change", function () {
		var s = $companystate.val();
		var pv = $companytype.data("preferredvalue");
		var $s = $("<select>");
		$.each(_staticdata.entityTypes, function (i, item) {
			//only show LLC & Corp, unless its DE and new order type
			if (i < 2 || (s == 0 && !_isexistingordertype) || (s == 2 && i == 3 && !_isexistingordertype)) {
				var $o = $("<option>").text(item.label).val(item.id);
				if (item.id == pv) $o.attr("selected", "selected");
				$s.append($o);
			};
		});
		$companytype.html($s.html()).trigger("change");
	});
};

function initContact() {
	//update lead and set party and new card
	$("#contact_section :input").on("change", function () {
		updateLead();

		var ci = getContactInfo("contact");

		//set default party if blank
		if (ci.firstName != "" && ci.lastName != "") {
			var name = ci.firstName + " " + ci.lastName;
			$(".parties_wrapper:has([data-defaultpartyname])").each(function (i, item) {
				var $wrapper = $(item);
				$wrapper.find("[data-defaultpartyname]").each(function (dpni, dpnitem) {
					var $defaultpartyname = $(dpnitem);
					if ($defaultpartyname.val() == "") $defaultpartyname.val(name);
				});
			});
		};

		//set new card
		if (ci.firstName != "" && ci.lastName != "" && ci.postal != "") {
			$("#payment_new_card_first_name_control").val(ci.firstName);
			$("#payment_new_card_last_name_control").val(ci.lastName);
			$("#payment_new_card_postal_control").val(ci.postal);
		};
	});

	//state selects set underlying input
	$("#contact_state_control_select").on("change", function () { _isdelaware = $(this).val() == "DE"; refreshServices(); });
	$("#contact_state_control_select, #future_state_control_select, #partner_state_control_select").on("change", function () {
		var stateName = $(this).val();
		var stateTextName = $(this).attr("id").replace("_select", "");
		var stateText = $("#" + stateTextName);
		stateText.val(stateName);
	});

	//future toggle
	$("#future_contact_same").on("change", function () {
		$("#future_wrapper").toggle(!$(this).prop("checked"));
	}).trigger("change");
};

function initParties() {
	//add party buttons
	$(".parties_wrapper [data-addparty]").each(function (i, item) {
		var $button = $(item);
		var $wrapper = $button.closest(".parties_wrapper");
		var $template = $wrapper.find("[data-partytemplate]");
		var $clone = $template.clone(true);

		//replace with target
		var $target = $("<div>").addClass("party_target");
		$template.replaceWith($target);

		$button.on("click", function () {
			var $new = $clone.clone(true);
			var instances = $target.find("[data-partytemplate]").length;

			//default party name
			if (instances > 0) $new.find("[data-defaultpartyname]").removeAttr("data-defaultpartyname");;

			//init change event
			$new.find(":input").on("change", function () { refreshServices(); });

			//fix ids (and fors)
			$new.find("[id]").each(function (ni, nitem) {
				var $nitem = $(nitem);
				var id = $nitem.attr("id");
				var newid = id + "_" + instances;
				$nitem.attr("id", newid);
				$new.find("[for='" + id + "']").attr("for", newid);
			});

			//radios
			if ($new.find(":radio").length && instances == 0) {
				$new.find(":radio").prop("checked", true);
			};

			//inject
			$target.append($new);

			//shares
			if ($wrapper.is("[data-defaulttotalshares]")) {
				var ts = $wrapper.data("defaulttotalshares");
				var s = parseInt(ts / (instances + 1));
				$target.find("[data-shares]").val(s);
			};

			//ownership
			if ($wrapper.is("[data-defaulttotalownership]")) {
				var to = $wrapper.data("defaulttotalownership");
				var o = parseInt(to / (instances + 1));
				$target.find("[data-ownership]").val(o);
			};

		}).trigger("click");
	});
};

function initServices() {
	//productidpriceplaceholder
	$("[data-productidpriceplaceholder]").each(function (i, item) {
		var $item = $(item);
		var pid = $item.data("productidpriceplaceholder");
		var price = getUnitPrice(pid, _key);
		$item.text(formatMoney(price));
	});
	//create package options
	$("#order_package_control option").each(function (i, item) {
		var $placeholder = $(item);
		var id = $placeholder.data("productid");

		//find product
		var parr = $.grep(_products, function (pitem, pi) { return pitem.id == id; });
		if (!parr.length) return true; //if it's not found, skip it...
		var p = parr[0];

		//build option
		var $option = $("<option>").val(p.id).attr("data-optiontext", p.name);
		for (data in $placeholder.data()) { $option.attr("data-" + data, $placeholder.data(data)); }

		$placeholder.replaceWith($option);
	});
	//store options in data and remove all from dom
	$("#order_package_control").data("options", $("#order_package_control").children()).html("").on("change", function () { refreshServices(); });

	//create service controls
	$(".services_wrapper [data-productid]").each(function (i, item) {
		var $placeholder = $(item);
		var id = $placeholder.data("productid");
		var desc = $placeholder.data("description");
		var multiple = $placeholder.is("[data-multiple]");

		//find product
		var parr = $.grep(_products, function (pitem, pi) { return pitem.id == id; });
		if (!parr.length) return true; //if it's not found, skip it...
		var p = parr[0];

		//build control
		var controlid = "service_control_" + p.id;
		var $control;
		if (multiple) {
			$control = $("<select>");
			for (var ci = 0; ci < 10; ci++) {
				var $o = $("<option>").val(ci).text(ci);
				$control.append($o);
			}
		}
		else {
			$control = $("<input>").attr("type", "checkbox");
		}

		//build details
		var $details = $("<div>").addClass("form-horizontal service_detail_wrapper").hide();
		$placeholder.find("[data-detailtype]").each(function (di, ditem) {
			var $ditem = $(ditem);
			var key = $ditem.data("detailkey");
			var type = $ditem.data("detailtype");
			var label = $ditem.data("detaillabel");

			//build control
			var $c = null;
			switch (type) {
				case "date":
					$c = $("<input>").attr("type", "date").val(new Date().toISOString().split("T")[0]);
					break;
				case "qualificationstate":
					$c = $("<select>").attr("data-qualificationstate", "");
					break;
				case "apostillecountry":
					$c = $("<select>").attr("data-apostillecountry", "");
					break;
				default:
					$c = $("<input>").attr("type", "text");
			}
			$c.addClass("form-control").attr("data-detailkey", key).attr("required", "");

			//build detail form
			var $lbl = $("<label>").text(label);
			var $d = $("<div>");
			$d.append($lbl);
			$d.append($("<div>").append($c));
			$details.append($d);
		});

		//build li
		var $li = $("<li>").addClass("service_item").attr("data-requiredwrapper", "");
		for (data in $placeholder.data()) { if (data != "description"); $li.attr("data-" + data, $placeholder.data(data)); }//TODO: clean this up...
		$control.attr("id", controlid).addClass("service_control").on("change", function () {
			var $this = $(this);
			var $price = $li.find(".service_price_label");
			var up = getUnitPrice(p.id, _key);
			var selected = $this.is(":checkbox") ? $this.prop("checked") : ($this.val() > 0);

			$this.attr("data-unitprice", up);
			$price.text(formatMoney(up));

			if (selected && p.id == _qualificationproductid) {
				var homestateid = $("#company_state_control").val();
				var q = $.grep(_products, function (item, i) { return item.id == _qualificationproductid; })[0];
				var stateids = getFeeStateIds(q.fees);
				var $s = $("<select>");
				$.each(_staticdata.stateTypes, function (i, item) {
					if (item.id != homestateid && $.inArray(item.id, stateids) > -1) {
						var qk = item.id + "-" + _key.split("-")[1];
						var qup = getUnitPrice(p.id, qk);
						$s.append($("<option>").val(item.label).text(item.name).attr("data-unitprice", qup)); //IMPORTANT TO SET OPTION VALUE TO STATE LABEL, TODO: figure out why...
					};
				});
				var $qs = $li.find("[data-qualificationstate]");
				$qs.html($s.html()).off("change").on("change", function () {
					var $o = $qs.find("option[value='" + $qs.val() + "']");
					var qup = $o.data("unitprice");
					$price.text(formatMoney(qup));
					$this.attr("data-unitprice", qup);
					refreshSummary();
				}).trigger("change");
			};

			$li.toggleClass("service_selected", selected);
			$li.find(".service_detail_wrapper").toggle(selected);
			refreshSummary();
		});
		$li.append($("<span>").addClass("service_price_label"));
		$li.append($control).append(" ");
		$li.append($("<label>").attr("for", controlid).addClass("service_name_label").text(p.name)).append(" ");
		if (desc) {
			var $i = $("<span>").append($("<i>").addClass("fa fa-question-circle")).addClass("service_detail_trigger");
			$li.append($("<span>").addClass("has-tip").attr({ "title": desc, "data-tooltip": "" }).append($i));
		}
		$li.append($details);

		//replace placeholder
		$placeholder.replaceWith($li);
	});
	initCountriesAndStates();
	//init service popovers
	$(document).foundation('tooltip', 'reflow');
};

function initPayment() {
	var $paymentmethods = $(":radio[name='payment_method']");
	var $paymenttypewrappers = $(".payment_type_wrapper");
	var $paymentcard = $("#payment_card_control");
	var $paymentcardwraper = $("#payment_new_card_wrapper");

	$paymentmethods.on("click change", function () {
		var type = $paymentmethods.filter(":checked").val();

		$paymenttypewrappers.each(function (i, item) {
			var $item = $(item);
			var show = $item.data("paymenttype") == type;
			$item.toggle(show);
		});

		refreshServices();
	}).trigger("change");

	$paymentcard.on("change", function () {
		$paymentcardwraper.toggle($paymentcard.val() == "");
	}).trigger("change");
};

function initSummary() {
	$("#order_promo_code").on("keyup change", function () {
		if (!_promo_buffer) {
			_promo_buffer = setTimeout(function () {
				refreshServices();
				_promo_buffer = null;
			}, 250);
		};
	});

	$("#btn_checkout").on("click", function () {
		//tou
		if (!$("#tou_agree").prop("checked")) {
			$("#tou_wrapper")[0].scrollIntoView();
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
			submitNewCreditCard(submitOrder);
		}
		else {
			//submit
			submitOrder();
		};
	});
};

function finishSetup() {
	var qs = $.deparam.querystring(true);
	var $ordertypes = $(":radio[name='order_type']");
	var $ordertypewrapper = $("#order_type_wrapper");
	var $companystate = $("#company_state_control");
	var $companytype = $("#company_type_control");

	//state
	if (qs.state) {
		var s = apiType("stateTypes", qs.state);
		if (s) {
			$companystate.data("preferredvalue", s.id).trigger("change");
		};
	};

	//type
	if (qs.entity) {
		var e = apiType("entityTypes", qs.entity);
		if (e) {
			$companystate.trigger("change");
			$companytype.data("preferredvalue", e.id).trigger("change");
		};
	};

	//order type
	if (qs.type) {
		var $r = $ordertypes.filter("[value='" + qs.type + "']");
		if ($r.length) {
			$r.prop("checked", true);
			$ordertypewrapper.hide();
		};
	};
	$ordertypes.filter(":checked").trigger("change");

	//account
	if (qs.accountid && qs.authkey) {
		var d = {};
		d.id = qs.accountid;
		d.authKey = qs.authkey;
		$.ajax({
			type: "GET",
			url: _baseapiurl + "/account",
			data: d,
			cache: true,
			success: function (msg) {
				if (msg.id) {
					setAccount(msg.id, d.authKey);
					setContactInfo(msg.contactInfo);
					setPaymentProfiles(msg.anetProfile);
				};
			}
		});
	};

	//lead
	if (qs.leadid && qs.tempid) {
		setLead(qs.leadid, qs.tempid);
	};

	//session
	if (qs.sessionid && qs.serverurl) {
		_sessionid = qs.sessionid;
		_serverurl = qs.serverurl;
	};
};

function init() {
	showLoadingDialog("Initializing order form");

	initType();

	initCompany();

	initContact();

	initParties();

	$.ajax({
		type: "GET",
		url: _baseapiurl + "/product",
		success: function (msg) {
			_products = msg;
			initServices();

			//TODO: figure out how to abstract this
			var qs = $.deparam.querystring(true);
			if (qs.productid) {
				var pids = $.isArray(qs.productid) ? qs.productid : [qs.productid];
				$("[data-productid]").each(function (i, item) {
					var $p = $(item);
					var id = $p.data("productid");
					if ($p.find(".service_control").length) $p = $p.find(".service_control").first();
					if ($.inArray(id, pids) > -1) {
						if ($p.is(":checkbox")) {
							$p.prop("checked", true);
						}
						else if ($p.is("select")) {
							$p.val(1);
						}
						else if ($p.is("option")) {
							var $s = $p.closest("select");
							if ($s.length) $s.val($p.val());
						};
						$p.trigger("change");
					};
				});
			};

			refreshServices(); //TODO: figure out where to do this...?
		}
	});

	initPayment();

	initSummary();

	finishSetup();		var $req = $("<span>").text("*").addClass("required-indicator");	$(":input[required]").each(function(i, item) {		var $item = $(item);		var id = $item.attr("id");		if (id) {			var $lbl = $("label[for='" + id + "']") 			if ($lbl.length) {				$lbl.append($req.clone());			};		};	});
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
