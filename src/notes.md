# Configuration Management

## Everything in version control
* Everything in version control, every artifact related to the creation of software
  * Source code - for infra and application
  * Application config files
  * Tests
  * Database scripts
  * Build and deploy scripts
  * Documentation
  * Tools

Can a new member of your team start from scratch?

Objective is to have everything that can possibly change at any point in the liofe of the project stored in a controlled manner.

Could argue:
* BAs should store req documents
* Testers should store test scripts in version control
* PMs should save release plans, progress charts etc,

## Managing Dependencies 

### External Libraries

* Always define using *exact* version of dependency

## Managing Software Configuration (p39)

### Fexlibility vs configurability?

* 1 of 3 parts that comprise an application, along with binaries and its data.

* Configuration can change behaviour of software at build time, deploy time and runtime. 

* Bad practice to inject config at build time. This follows priciple that you should be able to deploy same binary to every environment.

* Treat configuration as code, subject it to proper management, review and test.

* Anytime you change behaviour of app you are programming. Whether through code or config. Better to reduce amount you can configure if possible as breaking config changes can be hard to detect at build time and will become apparent at deploy / run time.

### Managing config (p43, p48 recap)

Need to consider

* How do I represent my configuration info - yaml, json, key / value 
* How is it stored - version control? Same repo as application? 
* How do deployment scripts access it
* How does it vary between envs

* Make sure list of configuration options is available in the same repo as source code

* Store actual values elsewhere - lifecycle is different to source code 

* Don't store passwords in source control

* Can set defaults to prod and and configure for each lower env

* Ensure you have tests to run at deploy time 
  * Are services you app depends on available (dbs, message quesues etc.)
  * Smoke tests to assert any functionality depending on config settings works as expected

### Managing multiple / legacy application configurations (p46)

* Record config options, where they are stored, lifecycle how they can be changed
* If pos generate this info at build time
* Goal is to be able to see each running applications configuration is currently set to in all envs
* Consider how other apps in ecosytem are manging their confoig, try and match theirs of pos
* Follow a naming convention

### 3rd party product configuration

When evaluating ask

* Can we deploy it
* Can we version it effectively
* How will it fit into our automated deployment strategy 

# Continuous Integration 

* Back int day - most of time software is in unstable state. No one is interested in running whole app until its finished
* prereqs:
  1. Version Control
  2. Automated build - run from the command line
  3. Agreement from the team - practice not a tool. Commitment and disipline. Everyone must check in small incremental changes to trunk _daily_ even multiple times a day.

Many other benefits to these small changes:
  * Less likely to break the build
  * Easier to review
  * More focused refactoring
  * Fewer conflicts

If you are on a branch, by definition you aren't integrated 

## Comprehensive automated test suite

* Unit Tests - no need to start whole app, no database, no filesystem, no network, minutes to run
* Component Tests - no need to start whole app, may hit database, filesystem or other systems (can be stubbed), longer to run
* Acceptance Tests - meet the acceptance criteria as defined by the user stories. Functionality provided by app as well as quality characteristics like security, availbility, capacity etc. Whole app starts, take a long time to run

## Keep build and test short 

If you don't keep it short:

* People will stop doing a full build and running tests before check in
* Multiple commits may be in trunk before you can run build again, meaning you don't know which check-in broke the build
* People will check in less often
* _Should_ take under 10 mins

## Local Development

* Start from a known good state
* Able to run the build
* Able to execute automated tests
* Able to deply to environment under their control
* Only under exceptional circumstances should you use a shared environemt for development
* Running app locally should use the _same_ automated processes that are used in continuous integration

## Essential Practices

* Don't check in on a broken build
* Always run all commit tests locally before commiting (or use pre flight builds - more on this later)
* Wait for commit tests to pass before moving on
* Never go home on a broken build 
* Be prepared to revert to previous revision
* Don't comment out failing tests - fix, update or delete
* Take responsibilty for all breakages as a result of your change - even those that seem unrelated
* TDD

# Testing Strategies

"Cease dependence on mass inspection to achieve quality. Improve the process and build quality into the product in the first place"

Testing quadrant image

# Deployment Pipeline (p105)

* CI massive step forward, helps the development process
* Delivery isn't just dev
* Majority of time can be spent in testing / ops
  * Testers waiting for a 'good' build
  * Dev team recieve bug report weeks after finishign the dev work
  * Ops teams waiting on builds / documentation
  * Discover at the end of the delivery lifecycle we do not support non functional reqs

"An automated manifestation of your process for getting software from version control into the hands of users"

# Deployment Pipeline Practices (p113)

* Only build binaries once
* Corollary to this - promte binaries not source code 
* Deply the same way to every environment
* Smoke test deployments
* Deploy into a copy of prod 
* If any part of the pipeline fails, stop the line - all team members responsible to fix

# Commit Stage 

First stage of the pipeline, also run on devs local machine or as PR builds

* Compile code
* Lint / static code analysis
* Run set of commit tests - may not be just unit, can include smoke test of we can run them quickly enough
* Prepare artifacts - test reports, binaries, metadata
* Commit stage execution time must be balanced with commit stage ability to identify most common error

# Automated Acceptance Tests

* Majority are functional
* Development team must respond to acceptance test breakages immediately
* Must be written within the team - developers must feel ownership otherwise they won't fix
* Corollary of this practice is developers must be able to run acceptance tests on their development machine - classic obstacle to this is test licenses not being available - this obstacle must be removed
* Acceptance tests must assert business value not coupled to technical implementation. Must be written in the 'Ubiqutous Language'. So "apply for Retriement Account" not "Click apply button"

# Build and Deploy Scripting

* Create a script for each stage of the pipeline (commit stage, acceptance stage, deploy stage, db migrations etc.)
* Use appropriate technology to deploy app - don't use general purpose scripting language (Helm for K8 anyone?)
* Use same script to deploy to every environment, build and deploy scripts must work locally as well as on prod like envs (may involve significant work to replace certain architectural components with )
* If developers rely on shared resources in order to run the app - the deployment of those components are run less frequently and the feedback loop is much slower
* Shouldn't be "How can we justify the effort to build a mock IDP" should be "How can we justify not investing in making the app run locally"
* Ensure deployment process is idempotent 

# Source Control

## Commiting 

Use meaningful commit messages

* Prepend all subject with ticket number
* Separate subject from body with a blank line
* Limit the subject line to 50 characters
* Capitalize the subject line
* Do not end the subject line with a period
* Use the imperative mood in the subject line
* Wrap the body at 72 characters
* Use the body to explain what and why vs. how

## Brancing strategies

* 3 times branch is acceptable to be made
  * Spike
  * Release
  * Impossible to make a change to the application using any other technique of feature flagging / branch by abstraction etc.
* What happens when you branch? The entire code base including test cases, configuration, database scripts etc. evolve separately
* If not for spike or release which are never merged back to mainline a branch means a merge
* Tension between branching and CI, if team members are working on branches then by definition they aren't performing CI
* Lean school of thought says anything not on trunk is essentially waste 
* Branches usually have soft dependencies between each otehr for instance a bug fix may need to be shared to all

## Branch for release

* Feature are always developed on mainline still
* Release branch is created when you are feature complete and want to continue working on new features
* Only critical fixes are added. Preference of fixing in trunk and cherry pick out, revert back to fix on release and cherry pick down
* New release branch has to come off trunk
* Once cycle beteween each cut of release branch is squeezed smaller and smaller as team matures essentially move to CD
* Github flow
* Trunk based


# Topics to cover

* Application config management
* Branching strategies 
* Artifact promotion
* Feedback loops
* Build time optimization 
* Repo structure
* DX / TX

# Managing Envs (p5)

* Terraform - done

# Misc. 

* Production environment should be completly locked down
* ChatOps

# Reading

* Continuous Delivery book (2010)
* DevOps Handbook (2016)
* Accelerate (2018)
* Lean Enterprise book (2015)
* GitOps - https://www.weave.works/technologies/gitops, https://github.com/weaveworks/flux, https://github.com/stefanprodan/k8s-podinfo
* Kubernetes workflow - https://developer.atlassian.com/blog/2017/07/kubernetes-workflow/
* https://www.weave.works/blog/managing-helm-releases-the-gitops-way
* https://continuousdelivery.com/
* https://trunkbaseddevelopment.com
* http://www.exampler.com/testing-com/writings/automate.pdf
* https://www.youtube.com/watch?v=W71BTkUbdqE&feature=youtu.be