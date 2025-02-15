#
# JPMS Attic: Integration Tests
#

include ../../tools/common.mk

INTEGRATION_TESTS ?= gson checkstyle

all: integration-tests

integration-tests:
	$(info Running integration tests...)
	$(RULE)$(MAKE) $(INTEGRATION_TESTS)

checkstyle:
	$(info Building Checkstyle...)
	@cd checkstyle && $(MAVEN_TEST) \
		-Dguava.version=$(GUAVA_VERSION) \
		-Derror-prone.version=$(ERROR_PRONE_VERSION) \
		--settings ../settings.xml \
		-U \
		-DskipTests \
		package
	@echo "Checkstyle test complete."

# Ghidra's build is pretty complex; it is not included for now.
ghidra:
	$(info Building Ghidra...)
	@cd ghidra && $(GRADLE_TEST) \
		-Pguava.version=$(GUAVA_VERSION) \
		-Pfailureaccess.version=1.0.3-jpms
	@echo "Ghidra test complete."

pmd:
	$(info Building PMD...)
	@cd pmd && $(MAVEN_TEST) \
		-Dguava.version=$(GUAVA_VERSION) \
		--settings ../settings.xml \
		-U \
		-DskipTests \
		package
	@echo "PMD test complete."

gson:
	$(info Cleaning GSON...)
	@cd gson && git clean -fdx && git reset --hard
	@echo "Patching GSON..."
	@cd gson && git apply ../../../tools/patches/gson-guava-version.diff
	@echo "Building GSON..."
	@cd gson && $(MAVEN_TEST) \
		-Dprotobuf.version=$(PROTOBUF_VERSION) \
		-Dguava.version=$(GUAVA_VERSION) \
		-Derror-prone.version=$(ERROR_PRONE_VERSION) \
		--settings ../settings.xml \
		-U \
		$(MAVEN_TEST_GOAL)
	@echo "Resetting GSON..."
	@cd gson && git reset --hard
	@echo "Gson test complete."

caffeine:
	$(info Cleaning Caffeine...)
	@cd caffeine && git clean -fdx && git reset --hard
	@echo "Patching Caffeine..."
	@cd caffeine && git apply ../../../tools/patches/caffeine-guava-version.diff
	@echo "Building Caffeine..."
	cd caffeine && $(GRADLE_TEST)
	@echo "Resetting Caffeine..."
	@cd caffeine && git reset --hard
	@echo "Caffeine test complete."

.PHONY: $(INTEGRATION_TESTS)
