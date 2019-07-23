JSLIBS := docs/jsoneditor.min.js docs/jsoneditor.min.css docs/img/jsoneditor-icons.svg docs/jszip.min.js
JSMAIN := docs/main.bundle.js
COPIES := docs/index.html docs/favicon.ico
NPATH := ./node_modules/.bin

all: $(JSLIBS) $(JSMAIN) $(COPIES)

docs/%.html: %.html
	cp $< $@

docs/favicon.ico: favicon.ico
	cp $< $@

docs/jsoneditor.%: node_modules/jsoneditor/dist/jsoneditor.%
	cp $< $@

docs/jszip.min.js: node_modules/jszip/dist/jszip.min.js
	cp $< $@

docs/img/jsoneditor-icons.svg: node_modules/jsoneditor/dist/img/jsoneditor-icons.svg
	mkdir -p ${@D}
	cp $< $@

docs/jsoneditor.min.js: node_modules/jsoneditor/dist/jsoneditor.min.js
	cp $< $@

$(JSMAIN): main.js
	$(NPATH)/rollup -c rollup.config.js $< --file $@
