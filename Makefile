JSLIBS := dist/jsoneditor.min.js dist/jsoneditor.min.css dist/img/jsoneditor-icons.svg dist/jszip.min.js
JSMAIN := dist/main.bundle.js
COPIES := dist/index.html dist/favicon.ico
NPATH := ./node_modules/.bin

all: $(JSLIBS) $(JSMAIN) $(COPIES)

dist/%.html: %.html
	cp $< $@

dist/favicon.ico: favicon.ico
	cp $< $@

dist/jsoneditor.%: node_modules/jsoneditor/dist/jsoneditor.%
	cp $< $@

dist/jszip.min.js: node_modules/jszip/dist/jszip.min.js
	cp $< $@

dist/img/jsoneditor-icons.svg: node_modules/jsoneditor/dist/img/jsoneditor-icons.svg
	mkdir -p ${@D}
	cp $< $@

dist/jsoneditor.min.js: node_modules/jsoneditor/dist/jsoneditor.min.js
	cp $< $@

$(JSMAIN): main.js
	$(NPATH)/rollup -c rollup.config.js $< --file $@
