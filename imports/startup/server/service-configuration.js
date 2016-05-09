if(process.env.NODE_ENV === "production")
{
	ServiceConfiguration.configurations.upsert({
		service: "facebook"
		}, {
		$set: {
			appId: "1608887562765922",
			loginStyle: "popup",
			secret: "891efcd9a71b03472fc7fc9e2c978d88"
		}
	});	
}
else
{
	// Use the configuration for the test app
	ServiceConfiguration.configurations.upsert({
		service: "facebook"
		}, {
		$set: {
			appId: "1625180767803268",
			loginStyle: "popup",
			secret: "d39f64b72ee67211e8b7654cbdbf63d3"
		}
	});	
}

