# K.I.T.

# Website:
    kit-inventory.com

# FRONTEND:

    SSH into frontend:
         ssh -i "C:\Users\15715\Downloads\LightsailDefaultKey-us-east-1 (1).pem" bitnami@44.218.4.191
         
    File Copying into front end:
        scp -i "C:\Users\15715\Downloads\LightsailDefaultKey-us-east-1 (1).pem" -r  C:/Users/15715/Desktop/KITProj/KIT/frontend/kit-website/build/* bitnami@44.218.4.191:/opt/bitnami/nginx/conf/kitbuilds

    Start and restart Website:
        sudo /opt/bitnami/ctlscript.sh start nginx
        sudo /opt/bitnami/ctlscript.sh restart nginx
        sudo /opt/bitnami/ctlscript.sh stop nginx

# BACKEND:
    SSH into bacskend:
        ssh -i "C:\Users\15715\Downloads\kit-ec2.pem" ec2-user@ec2-34-233-181-229.compute-1.amazonaws.com   

# Docker Commands:

    #Run Backend API Endpoints:
        docker run -p 5000:5000 -e GPT_API_KEY=your-api-key -e FRONTEND_HOST="44.218.4.191:3000" vishnut04/kit-backend:deploymentv1
    #Docker Commands:
        docker build -t kit-backend:tag .
        docker run -p 5000:5000 -e GPT_API_KEY=your-api-key -e FRONTEND_HOST=http://localhost:3000 -v C:/Users/15715/Desktop/KITProj/KIT/backend/Python_Files/Main_Scripts/best.pt:/app/backend/best.pt kit-backend 
        docker run -p 5000:5000 -e GPT_API_KEY=your-api-key -e FRONTEND_HOST="*" vishnut04/kit-backend:deploymentv1 --> for deployment, -v file mounting not required!
        docker kill $(docker ps -q) --> kills all containers
        docker rm container:id --> removes container
        docker run -p 5000:5000 -e OPENAI_API_KEY="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" -e FRONTEND_HOST="*" vishnut04/kit-backend:opt1 


