package com.webank.wecube.platform.core.controller;

import com.webank.wecube.platform.core.commons.WecubeCoreException;
import com.webank.wecube.platform.core.service.plugin.PluginPackageService;
import com.webank.wecube.platform.core.support.FakeS3Client;
import org.apache.commons.io.FileUtils;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.rules.TemporaryFolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.File;
import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PluginPackageControllerTest extends AbstractControllerTest {
    @ClassRule
    public static TemporaryFolder folder = new TemporaryFolder();

    @Autowired
    private PluginPackageService pluginPackageService;

    @BeforeClass
    public static void setupJunitTemporaryFolderSoThatTheContentsInTheFolderWillBeRemovedAfterTests() {
        try {
            System.setProperty("java.io.tmpdir", folder.newFolder().getCanonicalPath());
        } catch (IOException e) {
            fail(e.getMessage());
        }
    }

    @Test
    public void givenZeroPluginPackageWhenQueryAllThenReturnSuccessWithZeroPluginPackage() {
        try {
            mvc.perform(get("/v1/api/packages").contentType(MediaType.APPLICATION_JSON).content("{}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status", is("OK")))
                    .andExpect(jsonPath("$.message", is("Success")))
                    .andDo(print())
                    .andReturn().getResponse().getContentAsString();
        } catch (Exception e) {
            fail("Failed to query all plugin packages in PluginPackageController: " + e.getMessage());
        }
    }


    @Test
    public void givenEmptyPluginPackageWhenUploadThenThrowException() {
        try {
            MockHttpServletResponse response = mvc.perform(post("/v1/api/packages").contentType(MediaType.MULTIPART_FORM_DATA))
                    .andExpect(status().is4xxClientError())
                    .andDo(print())
                    .andReturn().getResponse();
            assertThat(response.getErrorMessage()).isEqualTo("Required request part 'zip-file' is not present");
        } catch (Exception e) {
            fail("Failed to upload plugin package in PluginPackageController: " + e.getMessage());
        }

        try {
            MockHttpServletResponse response = mvc.perform(post("/v1/api/packages").contentType(MediaType.MULTIPART_FORM_DATA).content(new byte[0]))
                    .andExpect(status().is4xxClientError())
                    .andDo(print())
                    .andReturn().getResponse();
            assertThat(response.getErrorMessage()).isEqualTo("Required request part 'zip-file' is not present");
        } catch (Exception e) {
            fail("Failed to upload plugin package in PluginPackageController: " + e.getMessage());
        }

        try {
            MockHttpServletResponse response = mvc.perform(post("/v1/api/packages").contentType(MediaType.MULTIPART_FORM_DATA).content(new MockMultipartFile("zip-file", new byte[0]).getBytes()))
                    .andExpect(status().is4xxClientError())
                    .andDo(print())
                    .andReturn().getResponse();
            assertThat(response.getErrorMessage()).isEqualTo("Required request part 'zip-file' is not present");
        } catch (Exception e) {
            fail("Failed to upload plugin package in PluginPackageController: " + e.getMessage());
        }
    }

    @Test
    public void givenPluginPackageNormalAndFakeS3ClientWhenUploadThenReturnSuccess() {
        pluginPackageService.setS3Client(new FakeS3Client());

        File testPackage = new File("src/test/resources/testpackage/service-management-v0.1.zip");
        MockMultipartFile mockPluginPackageFile = null;
        try {
            mockPluginPackageFile = new MockMultipartFile("zip-file", FileUtils.readFileToByteArray(testPackage));
        } catch (IOException e) {
            fail(e.getMessage());
        }

        assertThat(testPackage.exists()).isTrue();
        try {
            mvc.perform(MockMvcRequestBuilders.multipart("/v1/api/packages").file(mockPluginPackageFile))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("status", is("OK")))
                    .andExpect(jsonPath("message", is("Success")))
                    .andExpect(jsonPath("$.data.name", is("service-management")))
                    .andExpect(jsonPath("$.data.version", is("v0.1")))
                    .andExpect(jsonPath("$.data.pluginPackageImageUrl", is("https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v0.1/image.tar")))
                    .andExpect(jsonPath("$.data.uiPackageUrl", is("https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v0.1/ui.zip")))
                    .andDo(print())
                    .andReturn().getResponse();
        } catch (Exception e) {
            fail("Failed to upload plugin package in PluginPackageController: " + e.getMessage());
        }
    }

    @Test
    public void givenThreePackagesWhenQueryThenReturnAllPackages() {
        mockMultipleVersionPluginPackage();

        try {
            mvc.perform(get("/v1/api/packages").accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[*].id", contains(1, 2, 3)))
                    .andExpect(jsonPath("$.data[*].name", contains("cmdb", "cmdb", "cmdb")))
                    .andExpect(jsonPath("$.data[*].version", contains("v1.0", "v1.1", "v1.2")))
                    .andDo(print())
                    .andReturn().getResponse();
        } catch (Exception e) {
            fail("Failed to upload plugin package in PluginPackageController: " + e.getMessage());
        }
    }

    @Test
    public void givenNoConnectedReferenceWhenDeleteThenReturnSuccessful() {
        mockMultipleVersionPluginPackage();

        try {
            mvc.perform(delete("/v1/api/packages/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status", is("OK")))
                    .andExpect(jsonPath("$.message", is("Success")))
                    .andDo(print())
                    .andReturn().getResponse();
        } catch (Exception e) {
            fail("Failed to upload plugin package in PluginPackageController: " + e.getMessage());
        }
    }

    @Test
    public void givenConnectedReferenceWhenDeleteThenReturnFailed() {
        mockMultipleVersionPluginPackageWithReference();

        try {
            mvc.perform(delete("/v1/api/packages/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status", is("OK")))
                    .andExpect(jsonPath("$.message", is("Success")))
                    .andDo(print())
                    .andReturn().getResponse();
            fail("Should throw exception here.");
        } catch (Exception e) {
            assertThat(e.getMessage()).contains("Failed to delete Plugin[cmdb/v1.0] due to [Vpc Management] is still in used. Please decommission it and try again.");
        }

    }

    private void mockMultipleVersionPluginPackage() {
        executeSql("insert into plugin_packages (id, name, version, plugin_package_image_url, ui_package_url) values\n" +
                "  (1, 'cmdb', 'v1.0', 'https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v1.0/image.tar', 'https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v1.0/ui.zip')\n" +
                " ,(2, 'cmdb', 'v1.1', 'https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v1.1/image.tar', 'https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v1.1/ui.zip')\n" +
                " ,(3, 'cmdb', 'v1.2', 'https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v1.2/image.tar', 'https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v1.2/ui.zip')\n" +
                ";");
    }

    private void mockMultipleVersionPluginPackageWithReference() {
        executeSql("insert into plugin_packages (id, name, version, plugin_package_image_url, ui_package_url) values\n" +
                "  (1, 'cmdb', 'v1.0', 'https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v1.0/image.tar', 'https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v1.0/ui.zip')\n" +
                " ,(2, 'cmdb', 'v1.1', 'https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v1.1/image.tar', 'https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v1.1/ui.zip')\n" +
                " ,(3, 'cmdb', 'v1.2', 'https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v1.2/image.tar', 'https://localhost:9000/s3/wecube-plugin-package-bucket/service-management/v1.2/ui.zip')\n" +
                ";\n" +
                "insert into plugin_configs (id, plugin_package_id, name, entity_id, status) values\n" +
                " (11, 1, 'Vpc Management', 16, 'ONLINE')\n" +
                ",(21, 2, 'Vpc Management', 17, 'ONLINE')\n" +
                ",(31, 3, 'Vpc Management', 16, 'NOT_CONFIGURED')\n" +
                ";");
    }

    @Test
    public void getDependenciesByCorrectPackageIdShouldReturnSuccess() {
        try {
            uploadCorrectPackage();
        } catch (Exception ex) {
            fail();
        }

        try {
            mvc.perform(get("/v1/api/packages/1/dependencies").contentType(MediaType.APPLICATION_JSON).content("{}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.packageName", is("service-management")))
                    .andExpect(jsonPath("$.data.dependencies[*].packageName", contains("xxx", "xxx233")))
                    .andExpect(jsonPath("$.data.dependencies[*].version", contains("1.0", "1.5")))
                    .andDo(print())
                    .andReturn().getResponse().getContentAsString();
        } catch (Exception e) {
            e.printStackTrace();
            fail();
        }
    }

    @Test
    public void getDependenciesByWrongPackageIdShouldReturnError() {
        String wrongQueryId = "2";
        try {
            mvc.perform(get(String.format("/v1/api/packages/%s/dependencies", wrongQueryId)).contentType(MediaType.APPLICATION_JSON).content("{}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status", is("ERROR")))
                    .andExpect(jsonPath("$.message", is(String.format("Cannot find package by id: [%s]", wrongQueryId))))
                    .andExpect(jsonPath("$.data", is(nullValue())))
                    .andDo(print())
                    .andReturn().getResponse().getContentAsString();
        } catch (Exception e) {
            e.printStackTrace();
            fail();
        }
    }

    @Test
    public void getMenuByCorrectPackageIdShouldReturnSuccess() {
        try {
            uploadCorrectPackage();
        } catch (Exception ex) {
            fail();
        }
        String correctQueryId = "1";
        try {
            mvc.perform(get(String.format("/v1/api/packages/%s/menus", correctQueryId)).contentType(MediaType.APPLICATION_JSON).content("{}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[*].id", contains(1, 2)))
                    .andExpect(jsonPath("$.data[*].code", contains("JOBS_SERVICE_CATALOG_MANAGEMENT", "JOBS_TASK_MANAGEMENT")))
                    .andExpect(jsonPath("$.data[*].category", contains("JOBS", "JOBS")))
                    .andExpect(jsonPath("$.data[*].displayName", contains("Servive Catalog Management", "Task Management")))
                    .andExpect(jsonPath("$.data[*].path", contains("/service-catalog", "/task-management")))
                    .andDo(print())
                    .andReturn().getResponse().getContentAsString();
        } catch (Exception e) {
            e.printStackTrace();
            fail();
        }
    }

    @Test
    public void getMenuByWrongPackageIdShouldReturnError() {
        String wrongQueryId = "2";
        try {
            mvc.perform(get(String.format("/v1/api/packages/%s/dependencies", wrongQueryId)).contentType(MediaType.APPLICATION_JSON).content("{}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status", is("ERROR")))
                    .andExpect(jsonPath("$.message", is(String.format("Cannot find package by id: [%s]", wrongQueryId))))
                    .andExpect(jsonPath("$.data", is(nullValue())))
                    .andDo(print())
                    .andReturn().getResponse().getContentAsString();
        } catch (Exception e) {
            e.printStackTrace();
            fail();
        }
    }

    @Test
    public void getSystemParamsByCorrectPackageIdShouldReturnSuccess() {
        try {
            uploadCorrectPackage();
        } catch (Exception ex) {
            fail();
        }
        String correctQueryId = "1";
        try {
            mvc.perform(get(String.format("/v1/api/packages/%s/system_parameters", correctQueryId)).contentType(MediaType.APPLICATION_JSON).content("{}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[*].id", contains(1, 2)))
                    .andExpect(jsonPath("$.data[*].name", contains("xxx", "xxx")))
                    .andExpect(jsonPath("$.data[*].defaultValue", contains("xxxx", "xxxx")))
                    .andExpect(jsonPath("$.data[*].scopeType", contains("global", "plugin-package")))
                    .andDo(print())
                    .andReturn().getResponse().getContentAsString();
        } catch (Exception e) {
            e.printStackTrace();
            fail();
        }
    }

    @Test
    public void getAuthoritiesByCorrectPackageIdShouldReturnSuccess() {
        try {
            uploadCorrectPackage();
        } catch (Exception ex) {
            fail();
        }
        String correctQueryId = "1";
        try {
            mvc.perform(get(String.format("/v1/api/packages/%s/authorities", correctQueryId)).contentType(MediaType.APPLICATION_JSON).content("{}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[*].id", contains(1, 2, 3)))
                    .andExpect(jsonPath("$.data[*].roleName", contains("admin", "admin", "wecube_operator")))
                    .andExpect(jsonPath("$.data[*].menuCode", contains("JOBS_SERVICE_CATALOG_MANAGEMENT", "JOBS_TASK_MANAGEMENT", "JOBS_TASK_MANAGEMENT")))
                    .andDo(print())
                    .andReturn().getResponse().getContentAsString();
        } catch (Exception e) {
            e.printStackTrace();
            fail();
        }
    }

    @Test
    public void getRuntimeResourcesByCorrectPackageIdShouldReturnSuccess() {
        try {
            uploadCorrectPackage();
        } catch (Exception ex) {
            fail();
        }
        String correctQueryId = "1";
        try {
            mvc.perform(get(String.format("/v1/api/packages/%s/runtime_resources", correctQueryId)).contentType(MediaType.APPLICATION_JSON).content("{}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.docker[0].id", is(1)))
                    .andExpect(jsonPath("$.data.mysql[0].id", is(1)))
                    .andExpect(jsonPath("$.data.mysql[0].schema", is("service_management")))
                    .andExpect(jsonPath("$.data.mysql[0].initFileName", is("init.sql")))
                    .andExpect(jsonPath("$.data.mysql[0].upgradeFileName", is("upgrade.sql")))
                    .andExpect(jsonPath("$.data.s3[0].id", is(1)))
                    .andExpect(jsonPath("$.data.s3[0].bucketName", is("service_management")))
                    .andDo(print())
                    .andReturn().getResponse().getContentAsString();
        } catch (Exception e) {
            e.printStackTrace();
            fail();
        }
    }

    @Test
    public void getPluginsByCorrectPackageIdShouldReturnSuccess() {
        try {
            uploadCorrectPackage();
        } catch (Exception ex) {
            fail();
        }
        String correctQueryId = "1";
        try {
            mvc.perform(get(String.format("/v1/api/packages/%s/plugins", correctQueryId)).contentType(MediaType.APPLICATION_JSON).content("{}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[*].id", contains(1, 2)))
                    .andExpect(jsonPath("$.data[0].entityId", is(nullValue())))
                    .andExpect(jsonPath("$.data[1].entityId", is(nullValue())))
                    .andExpect(jsonPath("$.data[*].name", contains("task", "service_request")))
                    .andExpect(jsonPath("$.data[*].status", contains("NOT_CONFIGURED", "NOT_CONFIGURED")))
                    .andExpect(jsonPath("$.data[*].pluginPackageId", contains(1, 1)))
                    .andDo(print())
                    .andReturn().getResponse().getContentAsString();
        } catch (Exception e) {
            e.printStackTrace();
            fail();
        }
    }

    private void uploadCorrectPackage() throws Exception {
        pluginPackageService.setS3Client(new FakeS3Client());
        File testPackage = new File("src/test/resources/testpackage/service-management-v0.1.zip");
        MockMultipartFile mockPluginPackageFile = new MockMultipartFile("zip-file", FileUtils.readFileToByteArray(testPackage));
        mvc.perform(MockMvcRequestBuilders.multipart("/v1/api/packages").file(mockPluginPackageFile));
    }

}